import { createBrowserRouter, RouterProvider } from "react-router";
import { lazy, Suspense } from "react";
import LazyLoader from "@/components/LazyLoader";
import ErrorBoundary from "@/components/ErrorBoundary";
import { useAuth } from "@/store";
import { PrivateRoutes, PublicRoutes } from "./ProtectedRoutes";

// lazy import
const RootLayout = lazy(() => import("@/layout/RootLayout"));
const AuthLayout = lazy(() => import("@/layout/AuthLayout"));
const Home = lazy(() => import("@/pages/home/Hero"));
const Login = lazy(() => import("@/pages/auth/Login"));
const SignUp = lazy(() => import("@/pages/auth/SignUp"));
const VerifyAccount = lazy(() =>
  import("@/pages/auth/verifyAccount/VerifyAccount")
);
const ForgotPassword = lazy(() =>
  import("@/pages/auth/forgotPassword/ForgotPassword")
);
const ResetPassword = lazy(() =>
  import("@/pages/auth/resetPassword/ResetPassword")
);
const Settings = lazy(() => import("@/features/home/Settings"));
const Card = lazy(() => import("@/pages/home/Card"));

export default function AppRoutes() {
  const { accessToken, user } = useAuth();
  const routes = [
    {
      element: (
        <Suspense fallback={<LazyLoader />}>
          <RootLayout />
        </Suspense>
      ),
      errorElement: <ErrorBoundary />,
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<LazyLoader />}>
              <Home />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: "/account",
      element: (
        <Suspense fallback={<LazyLoader />}>
          <PublicRoutes accessToken={accessToken} user={user}>
            <AuthLayout />
          </PublicRoutes>
        </Suspense>
      ),
      errorElement: <ErrorBoundary />,
      children: [
        {
          path: "login",
          element: (
            <Suspense fallback={<LazyLoader />}>
              <Login />
            </Suspense>
          ),
        },
        {
          path: "signUp",
          element: (
            <Suspense fallback={<LazyLoader />}>
              <SignUp />
            </Suspense>
          ),
        },
        {
          path: "forgot-password",
          element: (
            <Suspense fallback={<LazyLoader />}>
              <ForgotPassword />
            </Suspense>
          ),
        },
        {
          path: "reset-password",
          element: (
            <Suspense fallback={<LazyLoader />}>
              <ResetPassword />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: "/verify-account",
      errorElement: <ErrorBoundary />,
      element: (
        <Suspense fallback={<LazyLoader />}>
          <VerifyAccount />
        </Suspense>
      ),
    },
    {
      path: "/settings",
      element: (
        <Suspense fallback={<LazyLoader />}>
          <Settings />
        </Suspense>
      ),
    },
    {
      path: "/properties",
      element: (
        <Suspense fallback={<LazyLoader />}>
          <PrivateRoutes accessToken={accessToken} user={user}>
            <Card />
          </PrivateRoutes>
        </Suspense>
      ),
    },
  ];
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
}
