import { toast } from "@/components/ui/use-toast";
import { fetchDecks } from "@/lib/api";
import { useStore } from "@/lib/store";
import { useEffect } from "react";

function useQueryDecks() {
  const decks = useStore((state) => state.decks);
  const setDeck = useStore((state) => state.setDeck);

  const loadDecks = async () => {
    try {
      const fetchedDecks = await fetchDecks();
      setDeck(fetchedDecks);
    }catch(err){
      toast({
        variant: "destructive",
        title: "Failed to fetch decks",
        description:
          (err as Error).message ||
          "There was an error loading decks. Please try again later.",
      });
    }
  };

  useEffect(() => {
    loadDecks();
  }, []);

  return { decks };
}

export default useQueryDecks;
