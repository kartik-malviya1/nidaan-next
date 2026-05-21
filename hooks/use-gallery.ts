import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { GalleryImage } from "@/lib/types";

export function useGalleryImages(category?: string, search?: string) {
  const queryParams = new URLSearchParams();
  if (category) queryParams.set("category", category);
  if (search) queryParams.set("search", search);

  const queryStr = queryParams.toString();
  const endpoint = `/gallery${queryStr ? `?${queryStr}` : ""}`;

  return useQuery<GalleryImage[]>({
    queryKey: ["gallery-images", category, search],
    queryFn: () => apiClient.get<GalleryImage[]>(endpoint),
  });
}

export function useSaveGalleryImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { title: string; category: string; url: string }) =>
      apiClient.post<GalleryImage>("/gallery", data),
    onSuccess: () => {
      // Invalidate stats and gallery list to trigger update
      queryClient.invalidateQueries({ queryKey: ["gallery-images"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
    },
  });
}

export function useDeleteGalleryImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => apiClient.delete<{ message: string; id: string }>(`/gallery/${id}`),
    onSuccess: () => {
      // Invalidate stats and gallery list to trigger update
      queryClient.invalidateQueries({ queryKey: ["gallery-images"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
    },
  });
}
