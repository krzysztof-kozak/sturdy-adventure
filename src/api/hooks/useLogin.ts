import type { z } from "zod";

import { useMutation } from "@tanstack/react-query";
import { apiClient } from "api/apiClient";

import type { UserLoginRequestSchema } from "api/schemas";
import { UserLoginResponseSchema } from "api/schemas";
import { useAuth } from "features/Auth/Auth";

type RequestData = z.infer<typeof UserLoginRequestSchema>;

function useLogin() {
  const { JWT, setJWT } = useAuth();

  return useMutation<unknown, Error, RequestData>({
    mutationFn: loginCredentials => {
      return apiClient.post("/users/login", loginCredentials);
    },
    onSuccess: response => {
      if (JWT) return;

      const parsedResponse = UserLoginResponseSchema.parse(response);
      const token = parsedResponse.data.user.token;
      setJWT(token);
    },
  });
}

export { useLogin };
