import InSearch from "@/components/common/InSearch";
import PaymentMode from "@/components/payment/PaymentMode";
import Total from "@/components/payment/Total";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const Payment = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <span className="font-semibold text-xl">Checkout</span>
        <div className="relative flex p-3">
          <ShoppingBag size={25} />
          <span
            className="bg-red-500 py-0 px-2 rounded-full absolute top-0 right-0 text-sm text-white"
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
          <Button className="w-2/3">Pay</Button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
