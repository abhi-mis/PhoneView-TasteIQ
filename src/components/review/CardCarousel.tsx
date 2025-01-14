import React, { useState, useEffect } from "react";
import TinderCard from "react-tinder-card";
import Image from "next/image";
import { useRouter } from "next/navigation";
import image1 from "@/public/1.png";
import image2 from "@/public/2.png";
import image3 from "@/public/3.png";

const dishes = [
  { name: "Pizza", image: image1 },
  { name: "Burger", image: image2 },
  { name: "Pasta", image: image3 },
];

const CardCarousel = () => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(dishes.length - 1);
  const [lastDirection, setLastDirection] = useState("");

  const swiped = (direction: string, _nameToDelete: string, index: number) => {
    setLastDirection(direction);
    setCurrentIndex(index - 1);
  };

  const outOfFrame = (name: string) => {
    console.log(name + " left the screen!");
  };

  useEffect(() => {
    if (currentIndex < 0) {
      router.push("/home");
    }
  }, [currentIndex, router]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-[300px] overflow-hidden gap-4">
      <div className="relative flex justify-center w-full max-w-sm h-[250px]">
        {dishes.map((dish, index) => (
          <TinderCard
            key={dish.name}
            onSwipe={(dir) => swiped(dir, dish.name, index)}
            onCardLeftScreen={() => outOfFrame(dish.name)}
            preventSwipe={["up", "down"]}
            swipeRequirementType="position"
            className="absolute inset-0 flex justify-center"
          >
            <div className="w-64 h-full p-4 rounded-2xl bg- shadow border backdrop-blur-xl">
              <div className="flex flex-col items-center justify-center h-full gap-4">
                <div className="relative w-32 h-32 rounded-full overflow-hidden bg-primary-foreground">
                  <Image
                    src={dish.image}
                    alt={`${dish.name}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-lg font-medium">{dish.name}</h3>
              </div>
            </div>
          </TinderCard>
        ))}
      </div>
      {lastDirection && (
        <div className="text-center text-sm">
          {lastDirection === "right" ? (
            <span className="text-green-500">Liked!</span>
          ) : (
            <span className="text-red-500">Disliked</span>
          )}
        </div>
      )}
    </div>
  );
};

export default CardCarousel;
