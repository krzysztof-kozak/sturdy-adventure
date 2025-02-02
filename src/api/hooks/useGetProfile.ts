import { useQuery } from "@tanstack/react-query";
import { apiClient } from "api/apiClient";
import { ProfileSchema } from "api/schemas";

function useGetProfile(username: string) {
  return useQuery({
    queryKey: ["profile", username],
    queryFn: async () => {
      const response = await apiClient.get("/profiles/" + username);
      return response.data;
    },
    select: data => {
      return ProfileSchema.parse(data.profile);
    },
  });
}

export { useGetProfile };
