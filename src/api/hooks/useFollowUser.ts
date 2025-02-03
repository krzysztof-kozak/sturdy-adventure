import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "api/apiClient";
import type { AxiosError, AxiosResponse } from "axios";
import { useAuth } from "features/Auth/Auth";

type RequestVariables = { username: string; slug?: string; action: "follow" | "unfollow" };
type Response = AxiosResponse<unknown>;

function useFollowUser() {
  const queryClient = useQueryClient();

  const mutation = useMutation<Response, AxiosError, RequestVariables>({
    mutationFn: variables => {
      const { username, action } = variables;

      if (action === "follow") {
        return apiClient.post(`/profiles/${username}/follow`);
      }

      return apiClient.delete(`/profiles/${username}/follow`);
    },

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["profile", variables.username] });

      if (variables.slug) {
        queryClient.invalidateQueries({ queryKey: ["article", variables.slug] });
      }
    },

    // TODO: add optimistic UI updates
    // TODO: then think about rollback in case of mutation error
  });

  const { isAuthenticated } = useAuth();

  const updateInProgess = mutation.isPending;

  return function handleFollowUser(variables: RequestVariables) {
    const { username, slug, action } = variables;

    if (!isAuthenticated) return;
    if (updateInProgess) return;

    mutation.mutate({ username, action, slug });
  };
}

export { useFollowUser };
