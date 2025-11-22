import React from "react";
import UploadImage from "./UploadImage";
import Logo from "@/components/Logo";

export default function Settings() {
  return (
    <div className="min-h-screen bg-gray-300 flex flex-col items-center gap-8 pt-12 ">
      <Logo />
      <div className="flex flex-col items-center justify-center gap-4 p-6">
        <UploadImage />
      </div>
    </div>
  );
}
