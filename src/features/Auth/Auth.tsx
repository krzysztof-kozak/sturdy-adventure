import { apiClient } from "api/apiClient";
import type { AxiosError, InternalAxiosRequestConfig } from "axios";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type JWT = string | undefined;
type SetJWT = Dispatch<SetStateAction<string | undefined>>;

type AuthContextValue = { JWT: JWT; setJWT: SetJWT; isAuthenticated: boolean } | undefined;

const AuthContext = createContext<AuthContextValue>(undefined);

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

type AuthProviderProps = {
  children: ReactNode;
};

function AuthProvider({ children }: AuthProviderProps) {
  const [JWT, setJWT] = useState<string>();

  const memoizedOnFullfilledRequest = useCallback(
    function onFullfilledRequest(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
      if (JWT) {
        config.headers.Authorization = "Token " + JWT;
      }
      return config;
    },
    [JWT]
  );

  function onRejectedRequest(error: AxiosError): Promise<AxiosError> {
    return Promise.reject(error);
  }

  useEffect(() => {
    if (!JWT) return;
    apiClient.interceptors.request.use(memoizedOnFullfilledRequest, onRejectedRequest);
  }, [JWT, memoizedOnFullfilledRequest]);

  const memoizedValue = useMemo(() => {
    return { JWT, setJWT, isAuthenticated: Boolean(JWT && JWT.length > 0) };
  }, [JWT]);

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}

export { AuthProvider, useAuth };
