import React from "react";

const price = [
  {
    text: "Subtotal",
    value: 846,
  },
  { text: "total", value: 846 },
];
const Total = () => {
  return (
    <div className="grid gap-4 divide-y-2 divide-foreground divide-dashed">
      {price.map((item, index) => (
        <div className="flex justify-between items-center" key={index}>
          <span className="font-medium text-base">{item.text}</span>
          <span className="font-medium text-base">₹{item.value}</span>
        </div>
      ))}
    </div>
  );
};

export default Total;
