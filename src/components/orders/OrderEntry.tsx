import React from "react";

const OrderEntry = () => {
  return (
    <div className="flex flex-col justify-between bg-primary-foreground rounded-2xl p-2 gap-1">
      <div className="flex justify-between items-center">
        <span className="text-xs text-muted-foreground rounded-xl font-medium border p-1">
          #23
        </span>
        <span className="text-xs px-2 py-1 bg-green-300 text-green-600 rounded-full font-medium">
          Ready
        </span>
      </div>
      <span className="font-medium">Chicken Biryani</span>
    </div>
  );
};

export default OrderEntry;
