import { zodResolver } from "@hookform/resolvers/zod";
import { RiLockFill } from "@remixicon/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate, useSearchParams } from "react-router";
import { validateResetPasswordSchema } from "@/utils/dataSchema";
import { resetPassword } from "@/api/auth";
import ErrorAlert from "@/components/ErrorAlert";
import FieldBody from "@/components/FieldBody";

export default function ResetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validateResetPasswordSchema),
  });
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  // look for values on our url bar
  const email = searchParams.get("email");
  const token = searchParams.get("token");

  const mutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: (response) => {
      toast.success(response?.data?.message);
      navigate("/account/login");
    },
    onError: (error) => {
      import.meta.env.DEV && console.log(error);
      setError(error?.response?.data?.message);
    },
  });

  const onSubmit = async (data) => {
    const userData = { ...data, email, token };
    mutation.mutate(userData);
  };

  return (
    <div className="bg-white p-4 shadow rounded-sm w-full max-w-[400px]">
      <form
        className="flex flex-col items-center gap-2 w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <RiLockFill
          size={40}
          className="text-green-500 p-2 border-[0.2px] border-green-500 rounded-full shadow"
        />
        <h1 className="text-2xl font-bold text-green-500">Create New Password</h1>
        <p className="text-gray-600 text-center">
          Please enter a new password. Your new password must be different from
          your previous password.
        </p>
        <div className="w-full md:w-[350px]">
          {error && <ErrorAlert error={error} />}
          <FieldBody
          fieldName="password"
            label="Password"
            type="password"
            placeholder="Password"
            register={register}
            errors={errors}
          />
          <FieldBody
          fieldName="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="Confirm Password"
            register={register}
            errors={errors}
          />
        </div>
        <button
          type="submit"
          className="py-3 rounded-md mt-5 bg-green-500 hover:bg-green-600 text-white w-full md:w-[350px] cursor-pointer"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}
