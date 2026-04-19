import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchApi, uploadFormData, deleteApi } from "../api/client";
import { queryKeys } from "./queryKeys";
import type { Entry, PaginatedResponse } from "../types";

interface ListParams {
  offset?: number;
  limit?: number;
  date_from?: string;
  date_to?: string;
}

export function useEntries(params?: ListParams) {
  const searchParams = new URLSearchParams();
  if (params?.offset) searchParams.set("offset", String(params.offset));
  if (params?.limit) searchParams.set("limit", String(params.limit));
  if (params?.date_from) searchParams.set("date_from", params.date_from);
  if (params?.date_to) searchParams.set("date_to", params.date_to);
  const qs = searchParams.toString();

  return useQuery({
    queryKey: queryKeys.entries.list(params as Record<string, string>),
    queryFn: () =>
      fetchApi<PaginatedResponse<Entry>>(`/entries/${qs ? `?${qs}` : ""}`),
  });
}

export function useEntry(id: number) {
  return useQuery({
    queryKey: queryKeys.entries.detail(id),
    queryFn: () => fetchApi<Entry>(`/entries/${id}`),
    enabled: id > 0,
  });
}

export function useEntryDates(year?: number, month?: number) {
  const params = new URLSearchParams();
  if (year) params.set("year", String(year));
  if (month) params.set("month", String(month));
  const qs = params.toString();

  return useQuery({
    queryKey: queryKeys.entries.dates(year, month),
    queryFn: () => fetchApi<string[]>(`/entries/dates${qs ? `?${qs}` : ""}`),
  });
}

export function useCreateEntry() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) =>
      uploadFormData<Entry>("/entries/", formData),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.entries.all });
    },
  });
}

export function useUpdateEntry() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: { text?: string; entry_date?: string };
    }) =>
      fetchApi<Entry>(`/entries/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.entries.all });
    },
  });
}

export function useDeleteEntry() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteApi(`/entries/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.entries.all });
    },
  });
}
