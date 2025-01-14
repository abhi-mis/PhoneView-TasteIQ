"use client";
import CardCarousel from "@/components/review/CardCarousel";
import ReviewForm from "@/components/review/ReviewForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import React from "react";

const page = () => {
  return (
    <div className="w-screen relative h-screen overflow-hidden flex flex-col items-center bg-secondary p-4 space-y-8">
      <div className="flex gap-4 items-center justify-start w-full">
        <ArrowLeft />
        <span className="font-medium text-xl">Leave a review</span>
      </div>
      <div className="w-full flex flex-col flex-1 justify-around">
        <div className="relative w-full flex flex-col  overflow-auto justify-center gap-4 items-center px-1">
          <CardCarousel />
          <span className="text-green-500 text-center text-sm">
            Swipe Right to Like
          </span>
          <ReviewForm />
        </div>
        <div className="w-full flex justify-center items-center">
          <Button className="rounded-2xl w-1/2 py-3 px-2 flex shadow-xl">
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default page;
