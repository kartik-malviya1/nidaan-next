import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { PaginatedResponse, Contact } from "@/lib/types";

interface UseContactsProps {
  page: number;
  search: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  limit?: number;
}

export function useContacts({
  page,
  search,
  sortBy = "createdAt",
  sortOrder = "desc",
  limit = 10,
}: UseContactsProps) {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    search,
    sortBy,
    sortOrder,
  });

  const endpoint = `/contact?${queryParams.toString()}`;

  return useQuery<PaginatedResponse<Contact>>({
    queryKey: ["contacts", page, search, sortBy, sortOrder, limit],
    queryFn: () => apiClient.get<PaginatedResponse<Contact>>(endpoint),
  });
}
