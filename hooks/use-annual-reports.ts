import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { AnnualReport } from "@/lib/types";

export function useAnnualReports() {
  return useQuery<AnnualReport[]>({
    queryKey: ["annual-reports"],
    queryFn: () => apiClient.get<AnnualReport[]>("/annual-reports"),
  });
}

export function useSaveAnnualReport() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      year: string;
      title: string;
      highlights: string[];
      coverUrl: string;
      pdfUrl: string;
      featured: boolean;
    }) => apiClient.post<AnnualReport>("/annual-reports", data),
    onSuccess: () => {
      // Invalidate queries to trigger refresh
      queryClient.invalidateQueries({ queryKey: ["annual-reports"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
    },
  });
}

export function useDeleteAnnualReport() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      apiClient.delete<{ message: string; id: string }>(`/annual-reports/${id}`),
    onSuccess: () => {
      // Invalidate queries to trigger refresh
      queryClient.invalidateQueries({ queryKey: ["annual-reports"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
    },
  });
}
