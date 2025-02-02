import { useQuery } from "@tanstack/react-query";
import { apiClient } from "api/apiClient";
import { ListOfArticlesSchema } from "api/schemas";

function useGetArticleList() {
  return useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const response = await apiClient.get("/articles");
      return response.data;
    },
    select: data => {
      return ListOfArticlesSchema.parse(data.articles);
    },
  });
}

export { useGetArticleList };
