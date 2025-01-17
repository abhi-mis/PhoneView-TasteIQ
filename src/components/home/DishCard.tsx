import React, { useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Minus, Plus, Clock, Flame } from "lucide-react";
import { motion } from 'framer-motion';
import DemoImage from './demo.webp';
import { useCart } from "@/components/cart/CartContext"; // Import useCart

interface DishCardProps {
  id: string;
  name: string;
  price: number;
  specialPrice?: number;
  image: StaticImageData | null;
  className?: string;
  description?: string;
  ingredients?: string[];
  spicyLevel?: "Mild" | "Medium" | "Hot";
  preparationTime?: string;
}

const DishCard = ({
  id,
  name,
  price,
  specialPrice,
  image,
  className = "",
  description = "A delicious traditional dish prepared with finest ingredients.",
  ingredients = ["Ingredient 1", "Ingredient 2", "Ingredient 3"],
  spicyLevel = "Medium",
  preparationTime = "20-25 mins",
}: DishCardProps) => {
  const [quantity, setQuantity] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const { state, dispatch } = useCart(); // Use useCart hook

  // Calculate the offer percentage
  const offer = specialPrice ? ((price - specialPrice) / price) * 100 : 0;

  useEffect(() => {
    const cartItem = state.items[id];
    if (cartItem) {
      setQuantity(cartItem.quantity);
    } else {
      setQuantity(0);
    }
  }, [state.items, id]);

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuantity((prev) => prev + 1);
    dispatch({
      type: 'ADD_ITEM',
      payload: { id, name, price: specialPrice || price, image: image?.src || DemoImage.src }
    });
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuantity((prev) => Math.max(0, prev - 1));
    dispatch({
      type: 'REMOVE_ITEM',
      payload: id
    });
  };

  const QuantityControl = () => (
    <div className="flex items-center gap-3">
      {quantity === 0 ? (
        <Button
          onClick={handleIncrement}
          className="text-sm rounded-full px-6 py-1.5 bg-primary hover:bg-primary/90 transition-all duration-300"
          type="button"
        >
          Add to Order
        </Button>
      ) : (
        <div className="flex items-center gap-3 bg-primary/10 rounded-full p-1">
          <Button
            onClick={handleDecrement}
            className="rounded-full w-8 h-8 p-0"
            type="button"
          >
            <Minus size={14} />
          </Button>
          <span className="text-lg font-medium w-8 text-center">{quantity}</span>
          <Button
            onClick={handleIncrement}
            className="rounded-full w-8 h-8 p-0"
            type="button"
          >
            <Plus size={14} />
          </Button>
        </div>
      )}
    </div>
  );

  const DishImage = ({ showOffer = true }: { showOffer?: boolean }) => (
    <div className="relative group items-center justify-center w-32 h-32 rounded-full bg-background shadow-lg">
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        <Image
          src={image || DemoImage}
          alt={name}
          className="size-full object-cover rounded-full shadow-lg"
          width={128}
          height={128}
        />
      </motion.div>
      {showOffer && offer > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-green-500 text-white rounded-full text-xs px-3 py-0.5 shadow-md"
        >
          {offer.toFixed(0)}% OFF
        </motion.div>
      )}
    </div>
  );

  return (
    <Dialog>
      <div
        className={`p-6 flex flex-col justify-center items-center bg-background rounded-3xl gap-4 transition-all duration-300 hover:shadow-lg ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <DialogTrigger className="contents">
          <motion.div
            className="cursor-pointer"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col justify-center items-center gap-4">
              <DishImage />
              <div className="flex flex-col justify-center items-center space-y-1">
                <span className="font-semibold text-lg text-center">{name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-primary font-bold">₹{specialPrice?.toFixed(2) || price.toFixed(2)}</span>
                  {specialPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      ₹{price.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </DialogTrigger>
        <QuantityControl />
      </div>

      <DialogContent className="max-w-md">
        <div className="flex flex-col h-full">
          <div className="bg-background p-8 rounded-t-lg shadow-sm">
            <div className="flex flex-col items-center gap-6">
              <DishImage showOffer={false} />
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold">{name}</h2>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-xl font-bold text-primary">₹{specialPrice?.toFixed(2) || price.toFixed(2)}</span>
                  {specialPrice && (
                    <span className="text-sm text-muted-foreground line-through">₹{price.toFixed(2)}</span>
                  )}
                </div>
                <QuantityControl />
              </div>
            </div>
          </div>

          <div className="p-8 space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-3">About this dish</h3>
              <p className="text-muted-foreground leading-relaxed">{description}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Ingredients</h3>
              <div className="grid grid-cols-2 gap-2">
                {ingredients.map((ingredient, index) => (
                  <div key={index} className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                    {ingredient}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Flame className={getSpicyLevelColor(spicyLevel)} size={20} />
                <div>
                  <p className="text-sm font-medium">Spicy Level</p>
                  <p className={`text-sm ${getSpicyLevelColor(spicyLevel)}`}>{spicyLevel}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="text-primary" size={20} />
                <div>
                  <p className="text-sm font-medium">Prep Time</p>
                  <p className="text-sm text-muted-foreground">{preparationTime}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const getSpicyLevelColor = (level: string) => {
  switch (level) {
    case "Mild": return "text-green-500";
    case "Medium": return "text-orange-500";
    case "Hot": return "text-red-500";
    default: return "text-gray-500";
  }
};

export default DishCard;