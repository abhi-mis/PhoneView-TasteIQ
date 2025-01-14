import React from "react";
import upi from "./icons/UPI.png";
import card from "./icons/card.png";
import cash from "./icons/cash.png";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import Image from "next/image";
const modes = [
  {
    icon: cash,
    name: "Cash",
  },
  {
    icon: card,
    name: "Credit Card",
  },
  {
    icon: upi,
    name: "UPI",
  },
];
const PaymentMode = () => {
  return (
    <RadioGroup defaultValue="upi" className="flex flex-col gap-3">
      {modes.map((mode, index) => (
        <div key={index} className="flex items-center justify-between">
          <Label htmlFor={`r-${index}`} className="flex items-center gap-2">
            <div className="bg-primary-foreground p-2 rounded-md shadow-sm">
              <Image src={mode.icon} alt={mode.name} width={32} height={32} />
            </div>
            <span>{mode.name}</span>
          </Label>
          <RadioGroupItem value={mode.name.toLowerCase()} id={`r-${index}`} />
        </div>
      ))}
    </RadioGroup>
  );
};

export default PaymentMode;
