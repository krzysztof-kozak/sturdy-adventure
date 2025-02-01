import { useQuery } from "@tanstack/react-query";
import { ListOfArticlesSchema } from "api/schemas";
import axios from "axios";

function useGetArticleList() {
  return useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:3000/api/articles");
      return response.data;
    },
    select: data => {
      return ListOfArticlesSchema.parse(data.articles);
    },
  });
}

export { useGetArticleList };
