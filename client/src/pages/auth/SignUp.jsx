import { registerUser } from "@/api/auth";
import ErrorAlert from "@/components/ErrorAlert";
import FieldBody from "@/components/FieldBody";
import { useAuth } from "@/store";
import { validatedSignUpSchema } from "@/utils/dataSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function SignUp() {
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(validatedSignUpSchema),
  });

   const { setAccessToken } = useAuth();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (response) => {
      //what you want to do if api call is a success
      toast.success(response?.data?.message || "Registration successful");
      const newUser = response?.data?.data?.user;
      //save accessToken
      setAccessToken(response?.data?.data?.accessToken);
      if (newUser && !newUser?.isVerified) {
        navigate("/verify-account");
      }
    },
    onError: (error) => {
      console.error(error);
      setError(error?.response?.data?.message || "Registration failed");
    },
  });

  const onSubmit = async (data) => {
    mutation.mutate(data); 
    
  };
  return (
    <div>
      <div className="text-black">
        <h1 className="font-semibold text-xl lg:text-2xl mb-4">
          Join our community of home seekers and explore the possibilities that
          await.{" "}
        </h1>
        <p>Lets get started by filling out the information below</p>
      </div>

      {error && <ErrorAlert error={error} />}
      <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
      <div className="grid grid-cols-12 sm:grid-cols-6 gap-3">
        <FieldBody
          fieldName="firstName"
          label="First Name"
          type="text"
          placeholder="First Name"
          register={register}
          errors={errors}
        />
        {/* fullname */}
        <FieldBody
          fieldName="lastName"
          label="Last Name"
          type="text"
          placeholder="Last Name"
          register={register}
          errors={errors}
        />
        </div>
        {/* email */}
        <FieldBody
          fieldName="email"
          label="Email"
          type="email"
          placeholder="Email"
          register={register}
          errors={errors}
        />
        {/* password */}
        <FieldBody
          fieldName="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          register={register}
          errors={errors}
        />
        {/* confirm password */}
        <FieldBody
          fieldName="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="confirm your password"
          register={register}
          errors={errors}
        />
        <button
          type="submit"
          className="bg-(--primary-color) text-white text-lg mt-4 w-full p-4 rounded-xl hover:bg-(--secondary-color) transition-colors cursor-pointer"
          disabled={mutation.isPending || isSubmitting}
        >
          {mutation.isPending || isSubmitting ? "Signing up..." : "Sign Up"}
        </button>
      </form>
      <p className="text-gray-600 text-lg text-center mt-7">
        Already have an account?{" "}
        <a href="/account/login" className="text-(--primary-color)">
          Sign In
        </a>
      </p>
    </div>
  );
}
