import Button from "@/components/Button";
import Footer from "@/components/Footer";
import Logo from "@/components/Logo";
import Nav from "@/components/Nav";
import React from "react";
import { Outlet } from "react-router";

export default function RootLayout() {
  return (
    <div className="h-screen">
      <div className="relative bg-[url(/bg.jpg)] bg-cover md:bg-contain bg-no-repeat h-full w-full">
        {/* dark overlay covering full height */}
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 flex justify-between items-center px-3 md:px-20 py-4 backdrop-brightness-80">
          <Logo />
          <Nav />
          <Button />
        </div>

        <div className="relative">
          <Outlet />
        </div>

        <Footer />
      </div>
    </div>
  );
}
