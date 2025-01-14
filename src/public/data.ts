import { StaticImageData } from "next/image";

export interface Dish {
  id: number;
  name: string;
  price: number;
  image: StaticImageData;
  category: string;
  offer?: number;
}

export interface CartItem extends Omit<Dish, "category"> {
  quantity: number;
  totalPrice: number;
}

export type DishesArray = Dish[];

export type CartArray = CartItem[];

import Image1 from "@/public/1.png";
import Image2 from "@/public/2.png";
import Image3 from "@/public/3.png";

export const MOCK_DISHES: DishesArray = [
  {
    id: 1,
    name: "Butter Chicken",
    price: 280,
    image: Image1,
    category: "Main Course",
    offer: 15,
  },
  {
    id: 2,
    name: "Gulab Jamun",
    price: 120,
    image: Image2,
    category: "Sweet Dish",
    offer: 10,
  },
  {
    id: 3,
    name: "Garlic Naan",
    price: 40,
    image: Image3,
    category: "Bread",
  },
  {
    id: 4,
    name: "Paneer Tikka",
    price: 220,
    image: Image1,
    category: "Main Course",
    offer: 20,
  },
  {
    id: 5,
    name: "Rasmalai",
    price: 150,
    image: Image2,
    category: "Sweet Dish",
  },
  {
    id: 6,
    name: "Butter Naan",
    price: 45,
    image: Image3,
    category: "Bread",
    offer: 5,
  },
];

export const cart: CartArray = [];
