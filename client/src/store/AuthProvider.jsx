import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import LazyLoader from "@/components/LazyLoader";
import { AuthContext } from ".";
import { getAuthenticatedUser, refreshAccessToken } from "@/api/auth";

export default function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);

// use this instead of your own
  //query to refresh accessToken on app start
 const {isPending: isLoading, data: dataToken} = useQuery({
  queryKey: ["refresh_token"],
  queryFn: () => refreshAccessToken(),
  onError: async (error) => {
    console.error("Error refreshing accessToken", error);
    setAccessToken(null);
  },
  enabled: !accessToken,
  retry: false,
 });

 //set newAccessToken data
 useEffect(() => {
  if (dataToken?.status === 200) {
    const newAccessToken = dataToken?.data?.data?.accessToken;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAccessToken(newAccessToken)
  }
 }, [dataToken?.data?.data?.accessToken, dataToken?.status])

  //fetch auth user
  const { isPending, data } = useQuery({
    queryKey: ["auth_user", accessToken],
    queryFn: () => getAuthenticatedUser(accessToken),
    onError: async (error) => {
      console.error("Error fetching user", error);
    },
    enabled: !!accessToken,
  });

  //setUser data
  useEffect(() => {
    if (data?.status === 200) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser(data?.data?.data);
    }
  }, [data?.data?.data, data?.status]);

  if ((isPending && accessToken) || isLoading) {
    return <LazyLoader />;
  }

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken, user }}>
      {children}
    </AuthContext.Provider>
  );
}
