"use client";

import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface InSearchProps {
  width?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  className?: string;
  icon?: boolean;
  iconValue?: React.ReactElement;
}

const InSearch = ({
  width = "w-full",
  placeholder = "Search here",
  onChange,
  className,
  icon = true,
  iconValue = (
    <Search className="absolute right-2 top-1/2 w-4 md:w-5 -translate-y-1/2 transform" />
  ),
}: InSearchProps) => {
  return (
    <div className={`relative flex items-center ${width}`}>
      {icon && iconValue}
      <Input
        placeholder={placeholder}
        className={`text-xs md:text-sm w-full bg-background ${className}`}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </div>
  );
};

export default InSearch;
