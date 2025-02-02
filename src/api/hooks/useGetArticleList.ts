import { useQuery } from "@tanstack/react-query";
import { apiClient } from "api/apiClient";
import { ListOfArticlesSchema } from "api/schemas";
import { useAuth } from "features/Auth/Auth";

function useGetArticleList() {
  const { isAuthenticated } = useAuth();

  const url = isAuthenticated ? "/articles/feed" : "/articles";

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

export { useGetArticleList };
