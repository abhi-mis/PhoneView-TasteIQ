import Image from "next/image";
import React from "react";
import image1 from "@/public/1.png";
import { CircleHelp, ShoppingBag } from "lucide-react";

const ProfileSection = () => {
  return (
    <div className="flex flex-col items-start gap-8">
      <div className="size-28 shadow-2xl overflow-hidden rounded-full">
        <Image src={image1} alt="logo" className="size-full object-cover" />
      </div>
      <span className="text-lg ">Hi, {"9415245235"}</span>
      <div className="flex flex-col items-start gap-5">
        <span className="flex gap-2">
          <ShoppingBag />
          My Orders
        </span>
        <span className="flex gap-2">
          <CircleHelp /> Helps and FAQ's
        </span>
      </div>
    </div>
  );
};

export default ProfileSection;
