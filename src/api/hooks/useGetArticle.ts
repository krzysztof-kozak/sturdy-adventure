import { useQuery } from "@tanstack/react-query";
import { ArticleSchema } from "api/schemas";
import axios from "axios";

function useGetArticle(slug: string) {
  return useQuery({
    queryKey: ["article", slug],
    queryFn: async () => {
      const response = await axios.get("http://localhost:3000/api/articles/" + slug);
      return response.data;
    },
    select: data => {
      return ArticleSchema.parse(data.article);
    },
  });
}

export { useGetArticle };
