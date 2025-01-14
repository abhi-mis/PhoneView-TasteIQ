import React from "react";
import date from "./image/date.png";
import tictactoe from "./image/tictactoe.png";
import Image from "next/image";
const games = [
  { text: "Tik Tac Toe", image: tictactoe },
  { text: "Fun Date Game", image: date },
];
const GameCard = () => {
  return (
    <div className="flex gap-2">
      {games.map((game) => (
        <div
          key={game.text}
          className="flex flex-col gap-2 bg-primary-foreground p-4 rounded-lg items-center"
        >
          <div className="overflow-hidden size-20 rounded-full">
            <Image
              src={game.image}
              alt="img"
              className="object-cover size-full"
            />
          </div>
          <span className="font-medium">{game.text}</span>
        </div>
      ))}
    </div>
  );
};

export default GameCard;
