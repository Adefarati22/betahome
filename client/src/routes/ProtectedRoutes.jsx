import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

export function PublicRoutes({ children, accessToken, user }) {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  useEffect(() => {
    console.log({ accessToken, user, from, location });
    if (accessToken && user) {
      navigate(from, {
        state: { from: location },
        replace: true,
      });
    }
  }, [accessToken, from, location, navigate, user]);
  return children;
}

export function PrivateRoutes({ children, accessToken, user }) {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.pathname;

  useEffect(() => {
    if (!accessToken || !user) {
      navigate("/account/login", {
        state: { from },
        replace: true,
      });
      return;
    }

    if (user && !user.isVerified && location.pathname !== "/verify-account") {
      navigate("/verify-account", {
        replace: true,
      });
      return;
    }
  }, [accessToken, from, location.pathname, navigate, user]);

  return children;
}


