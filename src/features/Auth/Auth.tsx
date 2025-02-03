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
  /*
  I decided to store JWT in memory. There are tradeofs in doing this
  It is safer (not vulnerable to XSS) but we lost the token on page refresh.

  If the provided backend API had refresh token I'd probably:
  - use short lived cookies with HttpOnly and Secure flags for the initial access
  - request refresh token
  - consider safety, e.g. set SameSite=Strict

  I'm not that experienced with security and auth so for the purpose of this demo,
  I found in-memory store of JWT to be the most pragmatic appraoch.
 */

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
    if (!JWT) {
      apiClient.interceptors.request.clear();
    }

    apiClient.interceptors.request.use(memoizedOnFullfilledRequest, onRejectedRequest);
  }, [JWT, memoizedOnFullfilledRequest]);

  const memoizedValue = useMemo(() => {
    return { JWT, setJWT, isAuthenticated: Boolean(JWT && JWT.length > 0) };
  }, [JWT]);

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}

export { AuthProvider, useAuth };
