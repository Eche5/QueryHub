import axios from "@/components/Authentication/axios";
import { useAuth } from "@/context/AuthContext";
const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get("/refresh-token", {
      withCredentials: true,
    });

    setAuth((prev) => {
      return {
        ...prev,
        user: response.data.user,
        accessToken: response.data.accessToken,
      };
    });

    return response.data.accessToken;
  };

  return refresh;
};
export default useRefreshToken;
