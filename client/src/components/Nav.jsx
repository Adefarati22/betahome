import React from "react";
import { NavLink } from "react-router";

export default function Nav() {
  return (
    <>
      <nav className="p-4 flex items-center justify-center gap-15 font-medium text-xl">
        <NavLink
          to={"#"}
          className={({ isActive }) =>
            isActive ? "text-white hover:underline" : "text-green-500 font-bold"
          }
        >
          Home
        </NavLink>
        <NavLink
          to={"#"}
          className={({ isActive }) =>
            isActive ? "text-white hover:underline" : "text-green-500 font-bold"
          }
        >
          Properties
        </NavLink>
        <NavLink
          to={"#"}
          className={({ isActive }) =>
            isActive ? "text-white hover:underline" : "text-green-500 font-bold"
          }
        >
          About Us
        </NavLink>
        <NavLink
          to={"#"}
          className={({ isActive }) =>
            isActive ? "text-white hover:underline" : "text-green-500 font-bold"
          }
        >
          Blog
        </NavLink>
        <NavLink
          to={"#"}
          className={({ isActive }) =>
            isActive ? "text-white hover:underline" : "text-green-500 font-bold"
          }
        >
          Contact Us
        </NavLink>
      </nav>
    </>
  );
}
