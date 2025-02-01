import { useQuery } from "@tanstack/react-query";
import { ListOfArticlesSchema } from "api/schemas";
import axios from "axios";

function useGetArticleListByAuthor(author: string) {
  return useQuery({
    queryKey: ["articles", author],
    queryFn: async () => {
      const response = await axios.get("http://localhost:3000/api/articles?author=" + author);
      return response.data;
    },
    select: data => {
      return ListOfArticlesSchema.parse(data.articles);
    },
  });
}

export { useGetArticleListByAuthor };
