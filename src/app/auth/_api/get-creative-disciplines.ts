import { GetDisciplinesEndpointData } from "@/api-types/disciplines.types";
import { api } from "@/lib/api";
import { API_ROUTES } from "@/lib/routes";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useOnboardingDisciplineStore } from "../../store/onboarding-disciplines.store";

const getCreativeDisciplinesApi = async () => {
  return await api.jsend<GetDisciplinesEndpointData>(
    API_ROUTES.GET_CREATIVE_DISCIPLINES,
    "GET"
  );
};

const getCreativeDisciplinesWithTagsApi = async ({
  slugs,
}: {
  slugs: string;
}) => {
  return await api.jsend<GetDisciplinesEndpointData>(
    API_ROUTES.GET_CREATIVE_DISCIPLINES_WITH_TAGS(slugs),
    "GET"
  );
};

export const useGetCreativeDisciplinesApi = () => {
  const { data, isLoading, isSuccess, error, refetch } = useQuery({
    queryKey: ["creative-disciplines"],
    queryFn: getCreativeDisciplinesApi,
    staleTime: Infinity,
  });
  const queryClient = useQueryClient();
  const cached = queryClient.getQueryData<GetDisciplinesEndpointData>([
    "creative-disciplines",
  ]);

  return {
    disciplines: data,
    isLoading,
    isSuccess,
    error,
    refetch,
    cachedDisciplines: cached,
  };
};

export const useGetCreativeDisciplinesWithTagsApi = ({
  slugs,
}: {
  slugs: string;
}) => {
  const { onboardingDisciplines } = useOnboardingDisciplineStore();
  const { data, isLoading, isSuccess, error, refetch } = useQuery({
    queryKey: ["creative-disciplines-with-tags"],
    queryFn: () => getCreativeDisciplinesWithTagsApi({ slugs }),
    staleTime: Infinity,
    enabled: onboardingDisciplines.length > 0,
  });
  const queryClient = useQueryClient();
  const cached = queryClient.getQueryData<GetDisciplinesEndpointData>([
    "creative-disciplines-with-tags",
  ]);
  return {
    disciplines: data,
    isLoading,
    isSuccess,
    error,
    refetch,
    cachedDisciplines: cached,
  };
};
