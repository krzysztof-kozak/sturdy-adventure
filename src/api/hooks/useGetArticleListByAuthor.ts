import { useQuery } from "@tanstack/react-query";
import { apiClient } from "api/apiClient";
import { ListOfArticlesSchema } from "api/schemas";

function useGetArticleListByAuthor(author: string) {
  return useQuery({
    queryKey: ["articles", author],
    queryFn: async () => {
      const response = await apiClient.get("/articles?author=" + author);
      return response.data;
    },
    select: data => {
      return ListOfArticlesSchema.parse(data.articles);
    },
  });
}

export { useGetArticleListByAuthor };
