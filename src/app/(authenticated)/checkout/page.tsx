"use client";
import AppliedPromo from "@/components/checkout/AppliedPromo";
import InputGrp from "@/components/checkout/InputGrp";
import Price from "@/components/checkout/Price";
import Promo from "@/components/checkout/Promo";
import SideDrawer from "@/components/common/SideDrawer";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import React, { useState } from "react";
import Payment from "./Payment";

const Page = () => {
  const [checked, setChecked] = useState(true);

  const inputItems = checked
    ? [
        { placeholder: "Name" },
        { placeholder: "Phone Number", buttonText: "Verify" },
      ]
    : [
        { placeholder: "Name" },
        { placeholder: "Phone Number", buttonText: "Verify" },
        { placeholder: "Table Number" },
      ];
  return (
    <div className="relative flex flex-col h-full w-full p-4 gap-6">
      <div className="rounded-2xl bg-green-50 border-green-500 border p-3 flex justify-between items-center">
        <span className="text-xs">Order Summary (4 items)</span>
        <span className="text-xs text-green-500">View Details</span>
      </div>
      <div className="flex justify-end items-center space-x-4 px-4">
        <Label htmlFor="airplane-mode" className="text-sm">
          {checked ? "Takeaway" : "Dine In"}
        </Label>
        <Switch
          className="data-[state=checked]:bg-green-500"
          onCheckedChange={setChecked}
          checked={checked}
        />
      </div>
      <InputGrp inputs={inputItems} />
      <AppliedPromo />
      <Promo />
      <Price />
      <div className="flex justify-center items-center pb-20">
        <SideDrawer
          text={
            <Button className="bg-green-500 text-white px-4 py-2 rounded-2xl w-full">
              Place Order {">"}
            </Button>
          }
          className="size-full py-10 bg-secondary absolute"
        >
          <Payment />
        </SideDrawer>
      </div>
    </div>
  );
};

export default Page;
