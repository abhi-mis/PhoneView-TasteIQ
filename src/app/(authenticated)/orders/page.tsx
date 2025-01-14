import GameCard from "@/components/orders/GameCard";
import OrderList from "@/components/orders/OrderList";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col h-full w-full p-4 gap-4">
      <div className="flex flex-col h-[25vh] overflow-y-auto">
        <OrderList />
      </div>
      <div className="flex flex-col flex-1 gap-3">
        <span className="text-sm">
          Play games, {" "}
          <span className="text-muted-foreground text-xs">
            while your order is preparing
          </span>
        </span>
        <GameCard />
      </div>
    </div>
  );
};

export default page;
