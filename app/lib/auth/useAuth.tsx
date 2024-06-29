import { useState } from "react";
import { useRouter } from "next/navigation";
interface UseAuthProps {
  data: {
    userName: string;
    password: string;
  };
}

const useAuth = ({ data }: UseAuthProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const loginApi = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://chat-backend-o3ec.onrender.com/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (response.ok) {
        setLoading(false);
        const result = await response.json();
        console.log(result);
        if (result.isConfirmed && !loading) {
          //   window.localStorage.setItem(
          //     "userDetails",
          //     JSON.stringify(result?.data)
          //   );
          router.push("/users");
        }
      } else {
        console.error("Error:", response.status);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return {
    loginApi,
    loading,
  };
};

export default useAuth;
