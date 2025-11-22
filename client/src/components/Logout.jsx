import { RiLogoutCircleRLine } from "@remixicon/react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { logout } from "@/api/auth";
import Modal from "./Modal";
import { useAuth } from "@/store";

export default function Logout() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const queryClient = useQueryClient();
  const { accessToken, setAccessToken } = useAuth();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: logout,
    onSuccess: (response) => {
      toast.success(response?.data?.message);
      queryClient.clear() //to clear all queries rather than just the user
      setIsOpen(false);
      setAccessToken(null); // Clear the access token from context
      navigate('/account/login', {replace:true});
    },
    onError: (error) => {
     import.meta.env.DEV && console.log(error);

      toast.error(error?.response?.data?.message, { id: "logout" }); //the id is to prevent duplicate toasts
    },
  });

  const onLogout = async () => {
    mutation.mutate(accessToken);
  };

  return (
    <>
      <button
        className={`${
          location.pathname === "/Verify-account"
            ? "btn btn-lg bg-red-500 hover:bg-red-600 text-white"
            : ""
        } p-4 flex gap-2 items-center text-base cursor-pointer text-red-500`}
        onClick={() => setIsOpen(true)}
      >
        <RiLogoutCircleRLine /> Logout
      </button>
      <Modal
        id="logoutModal"
        isOpen={isOpen}
        classname="bg-white p-4 rounded-xl shadow w-[90%] max-w-[400px] mx-auto"
      >
        <div className="flex flex-col items-center gap-2 w-full">
          <RiLogoutCircleRLine size={40} className="text-red-500" />
          <h1 className="text-2xl font-bold">Logout</h1>
          <p>are you sure you want to be logged out from your account?</p>
          <div className="mt-4 mb-2 flex gap-2">
            <button
              type="button"
              className="btn btn-outline w-[150px] border-[0.2px] border-gray-500 cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
            <button
              className="py-2 px-4 bg-red-500 hover:bg-red-600 text-white w-[150px] cursor-pointer"
              type="button"
              disabled={mutation.isPending}
              onClick={onLogout}
            >
              Yes, Logout
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
