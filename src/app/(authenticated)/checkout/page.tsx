"use client";
import AppliedPromo from "@/components/checkout/AppliedPromo";
import Price from "@/components/checkout/Price";
import Promo from "@/components/checkout/Promo";
import SideDrawer from "@/components/common/SideDrawer";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import React, { useState } from "react";
import Payment from "./Payment";
import { toast } from "sonner";

const Page = () => {
  const [checked, setChecked] = useState(true);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleVerifyOtp = async () => {
    setIsVerifying(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/send_otp_email/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          outlet_id: 16
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send OTP");
      }
      
      toast.success("OTP sent successfully!");
    } catch (error) {
      toast.error("Failed to send OTP. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handlePlaceOrder = async () => {
    if (!email || !otp) {
      toast.error("Please enter email and OTP");
      return;
    }

    setIsProcessing(true);
    const orderId = localStorage.getItem("order_id");
    
    if (!orderId) {
      toast.error("Order ID not found.");
      setIsProcessing(false);
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/assign_customer_to_order/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order_id: orderId,
          email: email,
          otp: otp,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to assign customer to order");
      }

      const result = await response.json();
      if (result.success) {
        toast.success("Order placed successfully!");
        setIsPaymentOpen(true); // Only open payment drawer after successful order placement
      } else {
        toast.error(result.message || "Failed to assign customer to order.");
      }
    } catch (error) {
      toast.error("Error occurred while placing the order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const inputItems = checked
    ? [
        { 
          placeholder: "Email",
          value: email,
          onChange: (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value),
          buttonText: "Send OTP",
          onButtonClick: handleVerifyOtp,
          loading: isVerifying
        },
        { 
          placeholder: "OTP",
          value: otp,
          onChange: (e: React.ChangeEvent<HTMLInputElement>) => setOtp(e.target.value),
        },
      ]
    : [
        { 
          placeholder: "Email",
          value: email,
          onChange: (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value),
          buttonText: "Send OTP",
          onButtonClick: handleVerifyOtp,
          loading: isVerifying
        },
        { 
          placeholder: "OTP",
          value: otp,
          onChange: (e: React.ChangeEvent<HTMLInputElement>) => setOtp(e.target.value),
        },
        { placeholder: "Table Number" },
      ];

  return (
    <div className="relative flex flex-col h-full w-full p-4 gap-6">
      <div className="rounded-2xl bg-green-50 border-green-500 border p-3 flex justify-between items-center">
        <span className="text-xs">Order Summary (4 items)</span>
        <span className="text-xs text-green-500">View Details</span>
      </div>
      <div className="flex justify-end items-center space-x-4 px-4">
        <Label htmlFor="airplane-mode" className="text-sm">
          {checked ? "Takeaway" : "Dine In"}
        </Label>
        <Switch
          className="data-[state=checked]:bg-green-500"
          onCheckedChange={setChecked}
          checked={checked}
        />
      </div>
      <div className="flex flex-col gap-4">
        {inputItems.map((field, index) => (
          <div key={index} className="flex items-center gap-1">
            <input
              type="text"
              placeholder={field.placeholder}
              value={field.value}
              onChange={field.onChange}
              className="border rounded-2xl px-2 py-2 w-full border-green-500 text-sm"
            />
            {field.buttonText && (
              <Button 
                onClick={field.onButtonClick} 
                disabled={field.loading} 
                className="text-sm rounded-2xl bg-green-500"
              > 
                {field.loading ? "Sending..." : field.buttonText}
              </Button>
            )}
          </div>
        ))}
      </div>
      {orderDetails && (
        <div className="mt-4 p-4 border rounded-lg bg-gray-100">
          <h3 className="text-lg font-semibold">Order Details</h3>
          <p><strong>Order ID:</strong> {orderDetails.order_id}</p>
          <p><strong>Total Amount:</strong> {orderDetails.total_amount}</p>
          <p><strong>Payment Status:</strong> {orderDetails.payment_status}</p>
          <p><strong>Order Status:</strong> {orderDetails.status}</p>
          <h4 className="mt-2 font-semibold">Order Items:</h4>
          <ul>
            {orderDetails.order_items.map(item => (
              <li key={item.id}>
                {item.quantity} x Item ID: {item.menu_item} - Total Price: {item.total_price}
              </li>
            ))}
          </ul>
        </div>
      )}
      <AppliedPromo />
      <Promo />
      <Price />
      <div className="flex justify-center items-center pb-20">
        <SideDrawer
          text={
            <Button 
              onClick={handlePlaceOrder} 
              disabled={isProcessing}
              className="bg-green-500 text-white px-4 py-2 rounded-2xl w-full"
            >
              {isProcessing ? "Processing..." : "Place Order >"} 
            </Button>
          }
          className="size-full py-10 bg-secondary absolute"
          isOpen={isPaymentOpen}
          onClose={() => setIsPaymentOpen(false)}
        >
          <Payment email={email} otp={otp} />
        </SideDrawer>
      </div>
    </div>
  );
};
export default Page;
