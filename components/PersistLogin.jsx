import useRefreshToken from "../hooks/useRefreshToken";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import Spinner from "./Loader";
import { useRouter } from "next/navigation";
import Loader from "./Loader";

function PersistLogin({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useRefreshToken();
  const router = useRouter();
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

    if (!auth?.accessToken) {
      verifyRefreshToken();
    } else {
      setIsLoading(false);
    }
  }, [auth, refresh]);

  useEffect(() => {
    if (!isLoading && !auth?.accessToken) {
      router.push("/");
    }
  }, [isLoading, auth, router]);

  return <>{isLoading ? <Loader /> : children}</>;
}

export default PersistLogin;
