import { useQuery } from "@tanstack/react-query";
import api from "../api/api";


export const useFetchMyShortUrls = (token, onError) => {
  return useQuery({
    queryKey: ["my-shortenurls"],
    queryFn: async () => {
      const response = await api.get("/api/urls/userMappings", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      });
      return response;
    },
    select: (data) => {
      const sortedData = data.data.sort(
        (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
      );
      return sortedData;
    },
    onError,
    staleTime: 5000,
  });
};
export const useFetchLinkAnalytics = (token, onError) => {
  return useQuery({
    queryKey: ['link-analytics'],
    queryFn: async () => {
      const res = await api.get(
        `/api/urls/User-Analytics?startDate=2024-10-01T00:00:00&endDate=2025-12-01T00:00:00`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    },
    onError,
    staleTime: 10000,
  });
};
