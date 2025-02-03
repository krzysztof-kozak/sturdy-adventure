import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "api/apiClient";
import { ArticleSchema } from "api/schemas";
import type { AxiosError, AxiosResponse } from "axios";
import { useAuth } from "features/Auth/Auth";
import { z } from "zod";

type RequestVariables = { slug: string; action: "favourite" | "unfavourite" };
type Response = AxiosResponse<unknown>;

const ApiResponseParser = z.object({ article: ArticleSchema });

function useFavouriteArticle() {
  const queryClient = useQueryClient();

  const mutation = useMutation<Response, AxiosError, RequestVariables>({
    mutationFn: variables => {
      const { slug, action } = variables;

      if (action === "favourite") {
        return apiClient.post(`/articles/${slug}/favorite`);
      }

      return apiClient.delete(`/articles/${slug}/favorite`);
    },

    onSuccess: ({ data }) => {
      const parsedResponse = ApiResponseParser.parse(data);
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      queryClient.invalidateQueries({ queryKey: ["article", parsedResponse.article.slug] });
    },

    // TODO: add optimistic UI updates
    // TODO: then think about rollback in case of mutation error
  });

  const { isAuthenticated } = useAuth();

  const updateInProgess = mutation.isPending;

  return function handleFavoriteArticle(variables: RequestVariables) {
    const { slug, action } = variables;

    if (!isAuthenticated) return;
    if (updateInProgess) return;

    mutation.mutate({ slug, action });
  };
}

export { useFavouriteArticle };
