"use client";
import Image from "next/image";
import React from "react";
import { usePathname } from "next/navigation";
import image1 from "@/public/1.png";
import SideDrawer from "../common/SideDrawer";
import ProfileSection from "../common/ProfileSection";

const Navbar = () => {
  const pathname = usePathname();

  const getNavContent = () => {
    switch (pathname) {
      case "/home":
        return {
          title: "The WowFoodie!",
          subtitle: "Food that everyone loves",
        };
      case "/cart":
        return {
          title: "Cart",
          subtitle: "Your selected items",
        };
      case "/orders":
        return {
          title: "My Orders",
          subtitle: "",
        };
      case "/checkout":
        return {
          title: "Checkout",
          subtitle: "Make payment and place your order",
        };
      default:
        return {
          title: "The WowFoodie!",
          subtitle: "Food that everyone loves",
        };
    }
  };

  const { title, subtitle } = getNavContent();

  return (
    <div className="pt-8 p-4 w-full flex justify-between items-center">
      <div className="flex flex-col items-start justify-center">
        <p className="text-xl font-medium text-left">{title}</p>
        <p className="font-semibold text-muted-foreground text-xs text-left">
          {subtitle}
        </p>
      </div>
      <div className="size-10 overflow-hidden rounded-full">
        <SideDrawer
          text={
            <Image src={image1} alt="logo" className="size-full object-cover" />
          }
        >
          <ProfileSection />
        </SideDrawer>
      </div>
    </div>
  );
};

export default Navbar;
