import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface SideDrawerProps {
  text: React.ReactElement;
  children: React.ReactNode;
  className?: string;
}

const SideDrawer: React.FC<SideDrawerProps> = ({
  text,
  children,
  className,
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>{text}</SheetTrigger>
      <SheetContent className={cn("py-12 w-full", className)}>
        {children}
      </SheetContent>
    </Sheet>
  );
};

export default SideDrawer;
