'use client';

import React, { useState } from "react";
import CartEntry from "./CartEntry";
import { useCart } from "./CartContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

export const useCheckout = () => {
  const { state, dispatch } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [specialInstructions, setSpecialInstructions] = useState("");
  const cartItems = Object.values(state.items);

  const handleCheckout = async () => {
    try {
      setLoading(true);
      const outletId = localStorage.getItem("outlet") || "16";
      const token = localStorage.getItem("bearerToken");

      if (!token) {
        toast.error("Please login to continue");
        return false;
      }

      const orderPromises = cartItems.map(item => {
        const orderData = {
          outlet_id: parseInt(outletId),
          menu_item: {
            menu_id: item.id,
            quantity: item.quantity,
            is_upsell: false,
            special_instructions: specialInstructions
          },
          order_id: "",
          customer_id: "",
          waiter_id: "",
          table_id: "",
          order_type: "DINE_IN"
        };

        return fetch(`${process.env.NEXT_PUBLIC_API_URL}/create_order/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(orderData)
        }).then(response => response.json()); // Parse JSON response
      });

      const responses = await Promise.all(orderPromises);
      const allSuccessful = responses.every(response => response.success);
      
      if (allSuccessful) {
        // Save the order_id from the last response
        // Assuming all orders are part of the same order group
        const lastResponse = responses[responses.length - 1];
        const orderId = lastResponse.order_id;
        
        // Save to localStorage
        localStorage.setItem('current_order_id', orderId);
        
        dispatch({ type: 'CLEAR_CART' });
        toast.success("Order placed successfully!");
        router.push("/checkout");
        return true;
      } else {
        toast.error("Failed to place some items in your order");
        return false;
      }
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Failed to create order");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { handleCheckout, loading };
};

const CartList = () => {
  const { state } = useCart();
  const [specialInstructions, setSpecialInstructions] = useState("");
  const cartItems = Object.values(state.items);

  return (
    <div className="flex flex-col min-h-screen pb-20">
      <div className="flex-1 space-y-4">
        {cartItems.length > 0 ? (
          <>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <CartEntry key={item.id} {...item} />
              ))}
            </div>
            
            <div className="px-4">
              <Textarea
                className="w-full max-w-md mx-auto text-sm resize-none"
                placeholder="Add special instructions (optional)"
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                rows={2}
              />
            </div>

            <div className="mt-4 pt-4 border-t px-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Total Amount</span>
                <span className="font-bold text-primary">₹{state.total.toFixed(2)}</span>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center text-muted-foreground py-8">
            Your cart is empty
          </div>
        )}
      </div>
    </div>
  );
};

export default CartList;