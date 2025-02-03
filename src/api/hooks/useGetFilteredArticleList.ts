import { useQuery } from "@tanstack/react-query";
import { apiClient } from "api/apiClient";
import { ListOfArticlesSchema } from "api/schemas";

type Params = Record<"author", string> | Record<"favorited", string>;

function useGetFilteredArticleList(params: Params) {
  return useQuery({
    queryKey: ["articles", params],
    queryFn: async () => {
      const response = await apiClient.get("/articles", { params });
      return response.data;
    },
    select: data => {
      return ListOfArticlesSchema.parse(data.articles);
    },
  });
}

export { useGetFilteredArticleList };
