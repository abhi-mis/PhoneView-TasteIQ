import React from "react";

const Price = () => {
  const price = [
    {
      name: "Subtotal",
      value: 50,
    },
    {
      name: "Total",
      value: 50,
    },
  ];
  return (
    <div className="flex flex-col gap-3 pb-2">
      {price.map((item, index) => (
        <div key={index} className="flex justify-between items-center">
          <span className="font-bold">{item.name}</span>
          <span className="text-sm font-medium">${item.value}</span>
        </div>
      ))}
    </div>
  );
};

export default Price;
