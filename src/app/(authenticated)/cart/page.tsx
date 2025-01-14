import CartList from "@/components/cart/CartList";
import InSearch from "@/components/common/InSearch";
import RecomDishes from "@/components/home/RecomDishes";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col h-full w-full p-4 gap-4">
      <div className="flex flex-col flex-1 overflow-y-auto">
        <CartList />
      </div>
      <InSearch width="w-full" icon={false} placeholder="add instructions" />
      <span className="text-sm font-medium">Recommended for you</span>
      <RecomDishes/>
    </div>
  );
};

export default page;
