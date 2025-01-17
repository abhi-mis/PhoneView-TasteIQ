'use client';

import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import DishCard from "./DishCard";

interface Category {
  id: number;
  name: string;
  is_enabled: boolean;
  created_at: string;
  updated_at: string;
}

interface Dish {
  id: number;
  name: string;
  price: number; // Actual price
  special_price?: number; // Special price
  image: string | null; // Image can be null
  description: string;
  ingredients: string[];
  spicyLevel: "Mild" | "Medium" | "Hot";
  preparationTime: string;
}

const DishTabs = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [menuItems, setMenuItems] = useState<Dish[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const outletId = parseInt(localStorage.getItem("outlet") || "", 10);
      const bearerToken = localStorage.getItem("bearerToken");
      const url = process.env.NEXT_PUBLIC_API_URL;

      if (isNaN(outletId) || !bearerToken) {
        setError("Outlet ID or Bearer Token not found in local storage.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${url}/get_category_by_outlet/?outlet_id=${outletId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${bearerToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch categories: ${response.statusText}`);
        }

        const data = await response.json();
        
        // Filter enabled categories and extract their names
        const enabledCategories = data.data.filter(
          (category: Category) => category.is_enabled
        );
        setCategories(enabledCategories);
        
        // Set initial selected category if categories exist
        if (enabledCategories.length > 0) {
          setSelectedCategory("All");
        }
        
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch categories");
        setLoading(false);
      }
    };

    fetchCategories();
  }, []); // Dependency array to ensure the effect runs once

  useEffect(() => {
    const fetchMenuItems = async () => {
      const outletId = parseInt(localStorage.getItem("outlet") || "16", 10);
      const bearerToken = localStorage.getItem("bearerToken" || "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM3NDc5NDMzLCJpYXQiOjE3MzY2MTU0MzMsImp0aSI6IjkzZjk4OTkzNjlhZDQ0N2E4Y2Q2ZTJhOGM0MmI0YjlmIiwidXNlcl9pZCI6MTl9.hZmmJcORth1CxwXKP223LVppGkLLxbifNnMVQeFdqUk");
      const url = process.env.NEXT_PUBLIC_API_URL;

      if (isNaN(outletId) || !bearerToken) {
        setError("Outlet ID or Bearer Token not found in local storage.");
        return;
      }

      try {
        const response = await fetch(
          `${url}/get_menu_by_outlet/?outlet_id=${outletId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${bearerToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch menu items: ${response.statusText}`);
        }

        const data = await response.json();
        setMenuItems(data.data); // Set the menu items from the response
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch menu items");
      }
    };

    fetchMenuItems();
  }, []); // Fetch menu items once when the component mounts

  // Reorder categories to put selected category first
  const allCategories = [{ id: 0, name: "All" }, ...categories];
  const reorderedCategories = [...allCategories].sort((a, b) => {
    if (a.name === selectedCategory) return -1;
    if (b.name === selectedCategory) return 1;
    return 0;
  });

  // Filter dishes based on selected category
  const filteredDishes = menuItems.filter((dish) =>
    selectedCategory === "All" ? true : dish.category === selectedCategory
  );

  return (
    <div>
      <div className="flex space-x-4 mb-4">
        {reorderedCategories.map((category) => (
          <Button
            key={category.id}
            onClick={() => setSelectedCategory(category.name)}
            className={`${
              selectedCategory === category.name ? "bg-primary text-white" : "bg-white-200 text-black"
            }`}
          >
            {category.name}
          </Button>
        ))}
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-2 gap-4 mt-4">
        {filteredDishes.map((dish) => (
          <DishCard
            key={dish.id}
            id={dish.id.toString()} // Pass the id prop
            name={dish.name}
            price={parseFloat(dish.price.toString())}
            specialPrice={dish.special_price ? parseFloat(dish.special_price.toString()) : undefined}
            image={dish.image ? dish.image : null}
            description={dish.description}
            ingredients={dish.ingredients}
            spicyLevel={dish.spicyLevel}
            preparationTime={dish.preparationTime}
          />
        ))}
      </div>
    </div>
  );
};

export default DishTabs;