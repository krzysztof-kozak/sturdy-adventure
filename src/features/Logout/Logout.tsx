import { useAuth } from "features/Auth/Auth";
import { useEffect } from "react";
import { useNavigate } from "react-router";

function Logout() {
  const { setJWT } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setJWT(undefined);
    navigate("/", { replace: true });
  }, [setJWT, navigate]);

  return <h1 className="logout-message">Logging out...</h1>;
}

export { Logout };
