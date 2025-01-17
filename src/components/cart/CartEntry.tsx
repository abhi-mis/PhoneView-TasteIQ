'use client';

import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useCart } from "./CartContext";

interface CartEntryProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const CartEntry: React.FC<CartEntryProps> = ({ id, name, price, quantity, image }) => {
  const { dispatch } = useCart();

  const handleIncrement = () => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { id, quantity: quantity + 1 },
    });
  };

  const handleDecrement = () => {
    if (quantity === 1) {
      dispatch({ type: 'REMOVE_ITEM', payload: id });
    } else {
      dispatch({
        type: 'UPDATE_QUANTITY',
        payload: { id, quantity: quantity - 1 },
      });
    }
  };

  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-3">
        <div className="bg-background rounded-lg p-2">
          <div className="rounded-full size-14 overflow-hidden">
            <Image
              src={image}
              alt={name}
              width={56}
              height={56}
              className="object-cover size-full"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium">{name}</span>
          <span className="text-xs text-muted-foreground">₹ {price}</span>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center space-y-1">
        <Plus size={20} className="cursor-pointer" onClick={handleIncrement} />
        <span className="text-sm text-center px-3 py-1 rounded-lg bg-foreground text-background">
          {quantity}
        </span>
        <Minus size={20} className="cursor-pointer" onClick={handleDecrement} />
      </div>
    </div>
  );
};

export default CartEntry;