import type { z } from "zod";

import { useMutation } from "@tanstack/react-query";
import { apiClient } from "api/apiClient";

import type { UserLoginRequestSchema } from "api/schemas";
import { UserLoginResponseSchema } from "api/schemas";
import { useAuth } from "features/Auth/Auth";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router";

type RequestData = z.infer<typeof UserLoginRequestSchema>;

function useLogin() {
  const { JWT, setJWT } = useAuth();
  const navigate = useNavigate();

  return useMutation<unknown, AxiosError, RequestData>({
    mutationFn: loginCredentials => {
      return apiClient.post("/users/login", loginCredentials);
    },
    onSuccess: response => {
      if (JWT) return;

      const parsedResponse = UserLoginResponseSchema.parse(response);
      const token = parsedResponse.data.user.token;
      setJWT(token);
      navigate("/", { replace: true });
    },
  });
}

export { useLogin };
