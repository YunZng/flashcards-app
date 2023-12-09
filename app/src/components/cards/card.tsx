import type { Card } from "@/lib/types";
import DeckActions from "./card-actions";
import { Button } from "../ui/button";
import { UpdateIcon } from "@radix-ui/react-icons";
import { useState } from "react";

const Card = ({ card }: { card: Card }) => {
  const [front, setFront] = useState<boolean>(true);
  return (
    <div className="flex flex-col justify-center items-center pb-12 snap-center">
      <div className="relative w-3/4 h-52">
        <div className={`absolute flex w-full h-full z-30 ${front ? "bg-white" : "bg-slate-200"} drop-shadow-md rounded-lg`}>
          <DeckActions id={card.id} />
          <div>
            <p className="flex overflow-auto text-xl w-full h-auto pt-4 pl-4 pr-4">
              {front ? card.front : card.back}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="absolute w-6 h-6 bottom-4 right-4 outline-none"
            onClick={() => { setFront(!front) }}>
            <UpdateIcon className="w-full h-full" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Card;
