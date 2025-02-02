import type { Dispatch, ReactNode, SetStateAction } from "react";
import { createContext, useContext, useMemo, useState } from "react";

type JWT = string | undefined;
type setJWT = Dispatch<SetStateAction<string | undefined>>;

type AuthContextValue = { JWT: JWT; setJWT: setJWT } | undefined;

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

  const memoizedValue = useMemo(() => {
    return { JWT, setJWT };
  }, [JWT]);

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}

export { AuthProvider, useAuth };
