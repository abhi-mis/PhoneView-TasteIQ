"use client";
import InSearch from "@/components/common/InSearch";
import PaymentMode from "@/components/payment/PaymentMode";
import Total from "@/components/payment/Total";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

interface PaymentProps {
  email: string;
  otp: string;
}

const Payment = ({ email, otp }: PaymentProps) => {
  const router = useRouter();
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const handlePlaceOrder = async () => {
    const orderId = localStorage.getItem("orderId") || "";
    
    if (!orderId) {
      toast.error("Order ID not found");
      return;
    }

    setIsPlacingOrder(true);
    try {
      const response = await fetch("https://api-stg.tasteiq.in/api/assign_customer_to_order/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order_id: orderId,
          email: email,
          otp: otp
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to place order");
      }

      toast.success("Order placed successfully!");
      router.push("/order-confirmation"); // Assuming you have an order confirmation page
    } catch (error) {
      toast.error("Failed to place order. Please try again.");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <span className="font-semibold text-xl">Checkout</span>
        <div className="relative flex p-3">
          <ShoppingBag size={25} />
          <span
            className="bg-red-500 py-0 px-2 rounded-full absolute top-0 right-0 text-sm text-white cursor-pointer"
            onClick={() => router.push("/cart")}
          >
            1
          </span>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="font-medium text-lg">Payment</span>
        <span className="font-medium text-sm text-red-500 bg-red-100 px-2 py-1 rounded-full">
          Pending
        </span>
      </div>
      <PaymentMode />
      <InSearch icon={false} placeholder="Enter UPI ID" />
      <div className="absolute w-full left-0 right-0 bottom-0 p-6 gap-3 flex flex-col flex-1 bg-primary-foreground rounded-tr-[40px] rounded-tl-[40px]">
        <Total />
        <div className="flex justify-center">
          <Button 
            className="w-2/3" 
            onClick={handlePlaceOrder}
            disabled={isPlacingOrder}
          >
            {isPlacingOrder ? "Processing..." : "Pay"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Payment;