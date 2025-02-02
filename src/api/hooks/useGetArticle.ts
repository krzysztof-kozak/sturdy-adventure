import { useQuery } from "@tanstack/react-query";
import { apiClient } from "api/apiClient";
import { ArticleSchema } from "api/schemas";

function useGetArticle(slug: string) {
  return useQuery({
    queryKey: ["article", slug],
    queryFn: async () => {
      const response = await apiClient.get("/articles/" + slug);
      return response.data;
    },
    select: data => {
      return ArticleSchema.parse(data.article);
    },
  });
}

export { useGetArticle };
