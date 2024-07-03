import useRefreshToken from "../hooks/useRefreshToken";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import Spinner from "./Spinner";
function PersistLogin({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useRefreshToken();

  const { auth } = useAuth();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  return <>{isLoading ? <Spinner /> : children}</>;
}

export default PersistLogin;
