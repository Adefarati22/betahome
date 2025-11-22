import FieldBody from "@/components/FieldBody";
import { validatedSignInSchema } from "@/utils/dataSchema";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/store";
import { toast } from "sonner";
import { loginUser } from "@/api/auth";
import ErrorAlert from "@/components/ErrorAlert";

export default function Login() {
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(validatedSignInSchema),
  });

  const { setAccessToken, user } = useAuth();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (response) => {
      toast.success(response?.data?.message || "Login successful");
      setAccessToken(response?.data?.data?.accessToken);
      if (user && !user?.isVerified) {
        navigate("/verify-account");
      }
    },
    onError: (error) => {
      import.meta.env.DEV && console.log(error);
      setError(error?.response?.data?.message || "Login failed");
    },
  });

  const onSubmit = async (data) => {
    mutation.mutate(data);
    console.log("login",data);
    
  };
  return (
    <div className="">
    <div  className="text-black mb-5">
      <h1 className="font-semibold text-2xl mb-4">Welcome Back to BetaHouse!</h1>
      <p>Lets get started by filling out the information below</p>
      </div>
      {error && <ErrorAlert error={error} />}

      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldBody
          fieldName="email"
          label="Email"
          type="email"
          placeholder="Email"
          register={register}
          errors={errors}
          isSubmitting={isSubmitting}
        />
        <FieldBody
          fieldName="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          register={register}
          errors={errors}
          isSubmitting={isSubmitting}
        />
        <div className="text-end mt-3">
        <a href="/account/forgot-password" className="text-red-500">Forgot Password</a>
        </div>
        <button
          type="submit"
          className="bg-(--primary-color) text-white mt-4 w-full p-4 rounded-xl hover:bg-(--secondary-color) transition-colors cursor-pointer"
          disabled={mutation.isPending || isSubmitting}
        >
          {mutation.isPending || isSubmitting ? "Signing in..." : "Signin"}
        </button>
      </form>
      <p className="text-gray-600 text-lg text-center mt-7">New User? <a href="/account/signup" className="text-(--primary-color)">Sign Up</a></p>
    </div>
  );
}
