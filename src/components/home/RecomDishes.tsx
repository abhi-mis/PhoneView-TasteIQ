"use client";
import React from "react";
import { MOCK_DISHES } from "@/public/data";
import DishCard from "./DishCard";
const RecomDishes = () => {
  return (
    <div>
      <div className="flex w-full gap-4 overflow-x-auto flex-nowrap pb-4">
        {MOCK_DISHES.map((dish) => (
          <DishCard
            key={dish.id}
            name={dish.name}
            price={dish.price}
            image={dish.image}
            offer={dish.offer}
            className="min-w-[170px]"
          />
        ))}
      </div>
    </div>
  );
};

export default RecomDishes;
