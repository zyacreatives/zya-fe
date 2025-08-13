import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { SubmitProjectDto, submitProjectSchema } from "../_schema";
import { z } from "zod";
import { auth, getUserDetails } from "@/lib/auth";
import { useGetPresignedUploadUrlApi } from "../_api/get-presigned-upload-url";
import ky from "ky";
import { convertToWebp } from "@/lib/convert-to-webp";
import { useCreateProjectApi } from "../_api/create-project";
import { RoleEnum } from "@/api-types";
import { useState } from "react";

export const useSubmitProject = (profile: "brand" | "creative") => {
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const form = useForm<SubmitProjectDto>({
    resolver: zodResolver(submitProjectSchema) as any,
    defaultValues: {
      clientName: "",
      description: "",
      endDate: "",
      startDate: "",
      projectCreatorType:
        profile === "brand" ? RoleEnum.BRAND : RoleEnum.CREATIVE,
      tags: [],
      title: "",
      url: "",
    },
  });
  const { getPresignedUploadUrl } = useGetPresignedUploadUrlApi();
  const { createProject } = useCreateProjectApi();

  const onSubmit = async (values: SubmitProjectDto) => {
    setIsPending(true);
    const user = await getUserDetails();
    const concurrencyLimit = 2;
    const uploadTasks = values.files.map((file, index) => {
      return async () => {
        const webPFile = await convertToWebp({
          file: file._rawFile,
          options: {
            maxSizeMB: 5,
            maxWidthOrHeight: 1500,
          },
        });
        const id = crypto.randomUUID();
        const key = `${user?.id}/projects/${
          profile === "brand" ? "brand" : "creative"
        }/${id}-${file.order}`;

        return new Promise<{ key: string; index: number }>(
          (resolve, reject) => {
            getPresignedUploadUrl(
              {
                contentType: "image/webp",
                key,
                isPublic: true,
              },
              {
                onSuccess: async (data) => {
                  try {
                    console.log(`Uploading file ${index + 1} to R2...`);
                    await ky.put(data.url, {
                      headers: { "Content-Type": "image/webp" },
                      body: webPFile,
                      timeout: false,
                    });
                    console.log(`✅ Upload ${index + 1} complete!`);
                    resolve({ key, index });
                  } catch (err) {
                    console.error(`❌ Upload ${index + 1} failed:`, err);
                    reject(err);
                  }
                },
                onError: (err) => {
                  setIsPending(false);
                  console.error(`❌ Presigned URL ${index + 1} failed:`, err);
                  reject(err);
                },
              }
            );
          }
        );
      };
    });

    const runWithConcurrency = async <T>(
      tasks: (() => Promise<T>)[],
      limit: number
    ): Promise<T[]> => {
      const results: T[] = [];
      let index = 0;

      const workers = new Array(limit).fill(null).map(async () => {
        while (index < tasks.length) {
          const currentIndex = index++;
          results[currentIndex] = await tasks[currentIndex]();
        }
      });

      await Promise.all(workers);
      return results;
    };

    try {
      console.log(`Uploading with concurrency limit: ${concurrencyLimit}...`);
      const uploadResults = await runWithConcurrency(
        uploadTasks,
        concurrencyLimit
      );

      const keysArray = new Array(values.files.length);
      uploadResults.forEach(({ key, index }) => {
        keysArray[index] = key;
      });

      console.log("🎉 All uploads complete! Creating project...");
      const { files, ...projectDto } = values;
      createProject(
        {
          ...projectDto,
          files: files.map((file, index) => {
            const { _rawFile, ...rest } = file;
            return {
              ...rest,
              key: keysArray[index],
              order: file.order,
            };
          }),
        },
        {
          onSuccess: async () => {
            setIsPending(false);
            setIsSuccess(true);
            console.log("✅ Project created successfully!");
            await auth.updateUser({
              //@ts-ignore
              onboardingPage: "DONE",
            });
          },
        }
      );
    } catch (error) {
      console.error("Failed to process files:", error);
      throw error;
    }
  };

  return { form, onSubmit, isPending, isSuccess };
};
