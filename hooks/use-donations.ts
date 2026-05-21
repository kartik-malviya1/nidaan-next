import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { PaginatedResponse, Donation } from "@/lib/types";

interface UseDonationsProps {
  page: number;
  search: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  limit?: number;
}

export function useDonations({
  page,
  search,
  sortBy = "createdAt",
  sortOrder = "desc",
  limit = 10,
}: UseDonationsProps) {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    search,
    sortBy,
    sortOrder,
  });

  const endpoint = `/donation?${queryParams.toString()}`;

  return useQuery<PaginatedResponse<Donation>>({
    queryKey: ["donations", page, search, sortBy, sortOrder, limit],
    queryFn: () => apiClient.get<PaginatedResponse<Donation>>(endpoint),
  });
}
