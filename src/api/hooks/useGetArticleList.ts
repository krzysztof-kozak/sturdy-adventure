import { useQuery } from "@tanstack/react-query";
import { apiClient } from "api/apiClient";
import { ListOfArticlesSchema } from "api/schemas";

type url = "/articles" | "/articles/feed";

function useGetArticles(url: url) {
  return useQuery({
    queryKey: ["articles", url],
    queryFn: async () => {
      const response = await apiClient.get(url);
      return response.data;
    },
    select: data => {
      return ListOfArticlesSchema.parse(data.articles);
    },
  });
}

export { useGetArticles };
