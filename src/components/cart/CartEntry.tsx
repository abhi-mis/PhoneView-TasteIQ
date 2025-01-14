import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import React from "react";
import image1 from "@/public/1.png";

const CartEntry = () => {
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-3">
        <div className="bg-background rounded-lg p-2">
          <div className="rounded-full size-14 overflow-hidden">
            <Image
              src={image1}
              alt="klfnsak"
              className="object-cover size-full"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium">Chicken Biryani</span>
          <span className="text-xs text-muted-foreground">₹ 200</span>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center space-y-1">
        <Plus size={20} />
        <span className="text-sm text-center px-3 py-1 rounded-lg bg-foreground text-background">
          1
        </span>
        <Minus size={20} />
      </div>
    </div>
  );
};

export default CartEntry;
