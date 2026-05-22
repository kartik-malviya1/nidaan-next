import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { PaginatedResponse, Application } from "@/lib/types";

interface UseApplicationsProps {
  page: number;
  search: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  limit?: number;
  type?: string; // "Volunteer" | "Internship" | ""
  status?: string; // "pending" | "reviewed" | "accepted" | "rejected" | ""
}

export function useApplications({
  page,
  search,
  sortBy = "createdAt",
  sortOrder = "desc",
  limit = 10,
  type = "",
  status = "",
}: UseApplicationsProps) {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    search,
    sortBy,
    sortOrder,
  });

  if (type) queryParams.set("type", type);
  if (status) queryParams.set("status", status);

  const endpoint = `/application?${queryParams.toString()}`;

  return useQuery<PaginatedResponse<Application>>({
    queryKey: ["applications", page, search, sortBy, sortOrder, limit, type, status],
    queryFn: () => apiClient.get<PaginatedResponse<Application>>(endpoint),
  });
}
