import React, { useState, useRef } from "react";
import {
  ControllerRenderProps,
  FieldError,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import { X, Image, Plus } from "lucide-react";

type Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  field: ControllerRenderProps<TFieldValues, TName>;
  error: FieldError | undefined;
};

export const MultiImageUploader = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  field,
  error,
}: Props<TFieldValues, TName>) => {
  const hasError = !!error;
  const [images, setImages] = useState<string[]>([]);
  const [dragOver, setDragOver] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const fileArray = Array.from(files);
    const validFiles = fileArray.filter((file) =>
      file.type.startsWith("image/")
    );

    if (validFiles.length === 0) return;

    const remainingSlots = 4 - images.length;
    const filesToAdd = validFiles.slice(0, remainingSlots);

    const newImagePromises = filesToAdd.map((file) => {
      return new Promise<{ previewUrl: string; rawFile: File }>((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const previewUrl = e.target?.result as string;
          resolve({ previewUrl, rawFile: file });
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(newImagePromises).then((newImageData) => {
      const updatedImages = [
        ...images,
        ...newImageData.map((data) => data.previewUrl),
      ];
      setImages(updatedImages);

      const fileObjects = updatedImages.map((imageUrl, index) => ({
        key: `image-${Date.now()}-${index}`,
        url: imageUrl,
        mimeType: "image/jpeg",
        isPlaceholder: false,
        order: index + 1,
        _rawFile: newImageData[index]?.rawFile ?? null,
      }));

      field.onChange(fileObjects);
    });
  };

  const removeImage = (indexToRemove: number) => {
    const updatedImages = images.filter((_, index) => index !== indexToRemove);
    setImages(updatedImages);

    const fileObjects = updatedImages.map((imageUrl, index) => ({
      key: `image-${Date.now()}-${index}`,
      url: imageUrl,
      mimeType: "image/jpeg",
      isPlaceholder: false,
      order: index + 1,
    }));

    field.onChange(fileObjects);
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(null);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent, divIndex: number) => {
    e.preventDefault();
    setDragOver(divIndex);
  };

  const handleDragLeave = () => {
    setDragOver(null);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const renderUploadDiv = (divIndex: number) => {
    const hasImage = images[divIndex];
    const canUpload = images.length < 4;
    const isDraggedOver = dragOver === divIndex;

    return (
      <div
        key={divIndex}
        className={`
    relative border rounded-lg h-full w-full flex items-center justify-center
    transition-all duration-200 cursor-pointer group
    ${
      hasImage
        ? ""
        : canUpload
        ? "border-gray-300 bg-gray-50"
        : "border-gray-200 bg-gray-100 cursor-not-allowed opacity-50"
    }
    ${isDraggedOver ? "border-primary" : ""}
    ${hasError ? "border-red-500" : ""}
  `}
        onDrop={(e) => handleDrop(e)}
        onDragOver={(e) => handleDragOver(e, divIndex)}
        onDragLeave={handleDragLeave}
        onClick={canUpload && !hasImage ? openFileDialog : undefined}
      >
        {hasImage ? (
          <>
            <img
              src={images[divIndex]}
              alt={`Upload ${divIndex + 1}`}
              className="w-full h-full overflow-hidden object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-transparent bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 rounded-lg flex items-center justify-center">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeImage(divIndex);
                }}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transform hover:scale-110"
              >
                <X size={16} />
              </button>
            </div>
            {divIndex === 0 && (
              <div className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded-full">
                Will also serve as thumbnail
              </div>
            )}
          </>
        ) : (
          <div className="text-center p-4 min-h-28 flex items-center justify-center">
            {canUpload ? (
              <>
                <Plus
                  strokeWidth={1.3}
                  className="bg-primary h-6 w-6 text-white rounded-full p-1"
                />
              </>
            ) : (
              <>
                <Image size={32} className="mx-auto mb-2 text-gray-300" />
                <p className="text-sm text-gray-400">Max 4 images reached</p>
              </>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="mb-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-lg text-neutral-700 font-medium">
            Main Image will be shown as Thumbnail
          </p>
          <p className="text-slate-400 text-sm">Min 400x400px, PNG or JPEG</p>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={openFileDialog}
            disabled={images.length >= 4}
            className={`
            flex items-center border border-neutral-200 text-sm gap-2 px-[10px] py-2 rounded-lg transition-colors
            ${
              images.length >= 4
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white text-slate-600 hover:cursor-pointer "
            }
          `}
          >
            Upload
          </button>
        </div>
      </div>
      <div className="lg:block hidden">
        <div className=" mb-4 h-[380px] flex-1">{renderUploadDiv(0)}</div>
        <div className="mx-auto">
          <div className="grid grid-cols-3 gap-4 mb-4">
            {[1, 2, 3].map((divIndex) => renderUploadDiv(divIndex))}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => handleFileSelect(e.target.files)}
            className="hidden"
          />
        </div>
      </div>
      <div className="lg:hidden">
        <div className="mx-auto">
          <div className="grid grid-cols-2 gap-4 mb-4">
            {[0, 1, 2, 3].map((divIndex) => renderUploadDiv(divIndex))}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => handleFileSelect(e.target.files)}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
};
