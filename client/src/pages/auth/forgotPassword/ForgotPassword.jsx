
import { RiLockFill } from "@remixicon/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema } from "@/utils/dataSchema";
import { forgotPassword } from "@/api/auth";
import ErrorAlert from "@/components/ErrorAlert";
import FieldBody from "@/components/FieldBody";

export default function ForgotPassword() {
  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors},
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  });
  const mutation = useMutation({
    mutationFn: forgotPassword,
    onSuccess: (response) => {
      toast.success(response?.data?.message || "Password reset link sent");
    },
    onError: (error) => {
      import.meta.env.DEV && console.log(error);
      setError(
        error?.response?.data?.message || "Failed to send password link"
      );
    },
  });

  const onSubmit = async (data) => {
    mutation.mutate(data);
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
        <h1 className="text-2xl font-bold text-green-500">Forgot Password</h1>
        <p className="text-muted-foreground text-center text-gray-600">
          Enter your email address and we'll send you a code to reset your
          password.
        </p>
        <div className="w-full md:w-[350px]">
          {error && <ErrorAlert error={error} />}
          <FieldBody
          fieldName="email"
            label="Email"
            type="email"
            placeholder="Email"
            register={register}
            errors={errors}
          />
        </div>
        <button
          type="submit"
          className="py-3 rounded-md mt-5 bg-green-500 hover:bg-green-600 text-white w-full md:w-[350px] cursor-pointer"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Sending..." : "Send Link"}
        </button>
      </form>
    </div>
  );
}
