import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";

const Header = () => {
  const [curDeck, setCurDeck] = useState<boolean>(false);
  const {deckId} = useParams();
  useEffect(() => {
    if(deckId){
      setCurDeck(true);
    }else{
      setCurDeck(false);
    }
  }, [deckId])
  return (
    <div className="flex justify-center gap-3 p-4">
      <Button variant={"link"} disabled={curDeck}>Decks</Button>
      <Button variant={"link"} disabled={!curDeck}>
        Cards
      </Button>
    </div>
  );
};

export default Header;
