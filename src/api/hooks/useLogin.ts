import { useMutation } from "@tanstack/react-query";
import { apiClient } from "api/apiClient";

import type { UserLoginSchema } from "api/schemas";
import type { z } from "zod";

type RequestData = z.infer<typeof UserLoginSchema>;

function useLogin() {
  return useMutation<unknown, Error, RequestData>({
    mutationFn: loginCredentials => {
      return apiClient.post("/users/login", loginCredentials);
    },
  });
}

export { useLogin };
