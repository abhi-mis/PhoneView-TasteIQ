import Image, { StaticImageData } from "next/image";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Minus, Plus } from "lucide-react";

interface DishCardProps {
  name: string;
  price: number;
  image: StaticImageData;
  offer?: number;
  className?: string;
  description?: string;
  ingredients?: string[];
  spicyLevel?: "Mild" | "Medium" | "Hot";
  preparationTime?: string;
}

const DishCard = ({
  name,
  price,
  image,
  offer,
  className = "",
  description = "A delicious traditional dish prepared with finest ingredients.",
  ingredients = ["Ingredient 1", "Ingredient 2", "Ingredient 3"],
  spicyLevel = "Medium",
  preparationTime = "20-25 mins",
}: DishCardProps) => {
  const [quantity, setQuantity] = useState(0);
  const discountedPrice = offer ? price - (price * offer) / 100 : price;

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuantity((prev) => Math.max(0, prev - 1));
  };

  const QuantityControl = () =>
    quantity === 0 ? (
      <Button
        onClick={handleIncrement}
        className="text-xs rounded-xl px-4 py-0.5"
        type="button"
      >
        Add
      </Button>
    ) : (
      <div
        className="flex items-center gap-2 rounded-xl px-2"
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          onClick={handleDecrement}
          className="rounded-xl px-3 py-0.5"
          type="button"
        >
          <Minus size={16} />
        </Button>
        <span className=" text-lg rounded-xl px-3 py-0.5">{quantity}</span>
        <Button onClick={handleIncrement} className="rounded-xl px-3 py-0.5 ">
          <Plus size={16} />
        </Button>
      </div>
    );

  const DishContent = ({ isDialog = false }) => (
    <div className="flex flex-col justify-center items-center gap-4">
      <div className={`relative size-16 ${!isDialog ? "cursor-pointer" : ""}`}>
        <Image
          src={image}
          alt={name}
          className="size-full object-cover rounded-full"
        />
        {offer && (
          <div className="absolute bottom-0 left-0 right-0 bg-green-200 text-green-800 rounded-xl text-xs px-1 text-center">
            {offer}%OFF
          </div>
        )}
      </div>
      <div
        className={`flex flex-col justify-center items-center ${
          !isDialog ? "cursor-pointer" : ""
        }`}
      >
        <span className="font-semibold text-center">{name}</span>
        <div className="flex gap-2">
          <span className="text-sm font-medium text-center">
            ₹{discountedPrice}
          </span>
          {offer && (
            <span className="text-sm font-medium line-through text-center">
              ₹{price}
            </span>
          )}
        </div>
      </div>
      <QuantityControl />
    </div>
  );

  return (
    <Dialog>
      <div
        className={`p-4 flex flex-col justify-center items-center bg-background rounded-2xl gap-4 ${className}`}
      >
        <DialogTrigger className="contents">
          <div className="cursor-pointer">
            <div className="flex flex-col justify-center items-center">
              <div className="relative size-16">
                <Image
                  src={image}
                  alt={name}
                  className="size-full object-cover rounded-full"
                />
                {offer && (
                  <div className="absolute bottom-0 left-0 right-0 bg-green-200 text-green-800 rounded-xl text-xs px-1 text-center">
                    {offer}%OFF
                  </div>
                )}
              </div>
              <div className="flex flex-col justify-center items-center mt-4">
                <span className="font-semibold text-center">{name}</span>
                <div className="flex gap-2">
                  <span className="text-sm font-medium text-center">
                    ₹{discountedPrice}
                  </span>
                  {offer && (
                    <span className="text-sm font-medium line-through text-center">
                      ₹{price}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </DialogTrigger>
        <QuantityControl />
      </div>

      <DialogContent className="max-w-full h-full p-0">
        <div className="flex flex-col h-full overflow-y-auto">
          <div className="bg-background p-6 shadow-sm">
            <DishContent isDialog={true} />
          </div>

          <div className="p-6 space-y-6 flex-1">
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Ingredients</h3>
              <ul className="list-disc list-inside text-sm text-muted-foreground">
                {ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>

            <div className="flex gap-6">
              <div>
                <h3 className="font-semibold mb-2">Spicy Level</h3>
                <p className="text-sm text-muted-foreground">{spicyLevel}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Preparation Time</h3>
                <p className="text-sm text-muted-foreground">
                  {preparationTime}
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DishCard;
