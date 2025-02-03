import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "api/apiClient";
import type { AxiosError, AxiosResponse } from "axios";
import { useAuth } from "features/Auth/Auth";

type RequestVariables = { slug: string; action: "favourite" | "unfavourite" };
type Response = AxiosResponse<unknown>;

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

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      queryClient.invalidateQueries({ queryKey: ["article", variables.slug] });
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
