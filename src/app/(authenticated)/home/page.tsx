import InSearch from "@/components/common/InSearch";
import DishTabs from "@/components/home/DishTabs";
import OfferCarousel from "@/components/home/OfferCarousel";
import RecomDishes from "@/components/home/RecomDishes";
import { Button } from "@/components/ui/button";
import { SlidersHorizontalIcon } from "lucide-react";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col h-full w-full p-4 gap-4">
      <div className="flex gap-2">
        <InSearch width="w-full" />
        <Button size="icon" className="">
          <SlidersHorizontalIcon className="size-[1.2rem]" />
        </Button>
      </div>
      <OfferCarousel />
      <span className="text-sm font-medium">Category</span>
      <DishTabs />
      <span className="text-sm font-medium">We Recommend</span>
      <RecomDishes />
    </div>
  );
};

export default page;
