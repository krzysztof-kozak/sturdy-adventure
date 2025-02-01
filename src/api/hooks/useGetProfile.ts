import { useQuery } from "@tanstack/react-query";
import { ProfileSchema } from "api/schemas";
import axios from "axios";

function useGetProfile(username: string) {
  return useQuery({
    queryKey: ["profile", username],
    queryFn: async () => {
      const response = await axios.get("http://localhost:3000/api/profiles/" + username);
      return response.data;
    },
    select: data => {
      return ProfileSchema.parse(data.profile);
    },
  });
}

export { useGetProfile };
