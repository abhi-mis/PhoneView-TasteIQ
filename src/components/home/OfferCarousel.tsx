import Image from "next/image";
import React from "react";
import image1 from "@/public/1.png";
const OfferCarousel = () => {
  return (
    <div className="w-full min-h-24 h-28 rounded-xl overflow-hidden">
      <Image src={image1} alt="" className="size-full object-cover" />
    </div>
  );
};

export default OfferCarousel;
