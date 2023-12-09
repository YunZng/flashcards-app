import type { Deck } from "@/lib/types";
import DeckActions from "./deck-actions";
import { Button } from "../ui/button";
import { EnterIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";
import { useStore } from "@/lib/store";

const Deck = ({ deck }: { deck: Deck }) => {

  const setselectedDeckId = useStore((state) => state.setSelectedDeckId);
  const handleChangeView = () => {
    setselectedDeckId(deck.id);
  }

  return (
    <div className="flex flex-col justify-center items-center pb-12 snap-center">
      <div className="relative w-3/4 h-52">
        <div className="absolute flex w-full h-full z-30 bg-white drop-shadow-md rounded-lg">
          <DeckActions id={deck.id} />
          <div>
            <p className="flex overflow-auto text-xl w-full h-auto pt-4 pl-4 pr-4">
              {deck.title}
            </p>
            <p className="flex overflow-auto text-md w-full h-auto pl-4 text-gray-500">
              {deck.numberOfCards} cards
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="absolute w-6 h-6 bottom-4 right-4 outline-none">
            <Link to={`decks/${deck.id}`} onClick={handleChangeView}>
              <EnterIcon className="w-full h-full" />
            </Link>
          </Button>
        </div>
        <div className="absolute flex w-full h-full items-center justify-center z-20 left-1 top-1 drop-shadow-md rounded-lg bg-white"></div>
        <div className="absolute flex w-full h-full items-center justify-center z-10 left-2 top-2 drop-shadow-md rounded-lg bg-white"></div>
      </div>
    </div>
  );
};

export default Deck;
