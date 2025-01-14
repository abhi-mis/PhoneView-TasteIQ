"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import DishCard from "./DishCard";
import { MOCK_DISHES } from "@/public/data";

const Categories = ["All", "Main Course", "Sweet Dish", "Bread"];

const DishTabs = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Reorder categories to put selected category first
  const reorderedCategories = [...Categories].sort((a, b) => {
    if (a === selectedCategory) return -1;
    if (b === selectedCategory) return 1;
    return 0;
  });

  // Filter dishes based on selected category
  const filteredDishes = MOCK_DISHES.filter((dish) =>
    selectedCategory === "All" ? true : dish.category === selectedCategory
  );

  return (
    <div className="flex flex-col w-full gap-4">
      {/* tabs */}
      <div className="flex gap-2 w-full overflow-x-auto flex-nowrap scroll-smooth">
        {reorderedCategories.map((category) => (
          <Button
            key={category}
            className={`text-xs p-2 whitespace-nowrap ${
              selectedCategory === category
                ? "bg-foreground text-background"
                : "bg-background text-foreground"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>
      {/* DishCards */}
      <div className="flex w-full gap-4 overflow-x-auto flex-nowrap pb-4">
        {filteredDishes.map((dish) => (
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

export default DishTabs;
