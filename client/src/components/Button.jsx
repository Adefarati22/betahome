import { Link } from "react-router";
import { useAuth } from "@/store";
import { useNavigate } from "react-router";
import { useState } from "react";
import Logout from "./Logout";

export default function NavbarUserActions() {
  const { accessToken, user } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  if (!accessToken) {
    return (
      <div>
        <Link
          to="/account/signup"
          className="border-white border-2 text-white rounded-md p-2 md:px-8 md:py-3 text-sm font-medium hover:bg-white hover:text-(--primary-color) transition-colors"
        >
          Sign Up
        </Link>
        <Link
          to="/account/login"
          className="bg-(--primary-color) text-white rounded-md ml-4 px-2 md:px-8 py-3 text-sm font-medium hover:bg-(--secondary-color) transition-colors"
        >
          Login
        </Link>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Avatar + name display */}
      <button
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      >
        <div className="avatar">
          <div className="w-12 rounded-full border-3 border-gray-800">
            {user?.avatar ? (
              <img
                src={user?.avatar}
                alt={user?.firstName.split(" ")[0].charAt(0)}
                referrerPolicy="no-referrer"
                loading="lazy"
                priority="high"
              />
            ) : (
              <span className="text-xl flex items-center justify-center pt-2">
                {user?.firstName
                  ?.split(" ")
                  ?.map((name) => name[0])
                  .join("")
                  .toUpperCase()}
              </span>
            )}
          </div>
        </div>
        <span className="text-white font-medium">
          {user?.firstName + " " + user?.lastName}
        </span>
      </button>

      {/* Dropdown menu */}
      {open && (
        <div className="absolute right-0 mt-2 bg-white text-black rounded-md shadow-lg p-3 w-40">
          <button
            className="block w-full text-left hover:bg-gray-100 p-2 rounded"
            onClick={() => navigate("/settings")}
          >
            Change Avatar
          </button>
          <Logout />
        </div>
      )}
    </div>
  );
}
