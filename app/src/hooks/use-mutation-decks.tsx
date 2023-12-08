import { toast } from "@/components/ui/use-toast";
import { addNewDeck, editDeck, removeDeck } from "@/lib/api";
import { useStore } from "@/lib/store";
import { Deck } from "@/lib/types";

function useMutationDecks() {
  const _removeDeck = useStore((state) => state.removeDeck);
  const _addDeck = useStore((state) => state.addDeck);
  const _editDeck = useStore((state) => state.editDeck);

  const deleteDeck = async (deckId: string) => {
    try {
      await removeDeck(deckId);
      _removeDeck(deckId);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to delete",
        description:
          (error as Error).message ||
          "There was an error deleting deck.",
      });
    }
  };

  const addDeck = async (title: string) => {
    try {
      const newDeck: Deck = await addNewDeck(title);
      newDeck.numberOfCards = 0;
      _addDeck(newDeck);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to add",
        description:
          (error as Error).message ||
          "There was an error adding deck.",
      });
    }
  };

  const editADeck = async (title: string, id: string) => {
    try {
      const deck = await editDeck(title, id);
      _editDeck(deck);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to edit",
        description:
          (error as Error).message ||
          "There was an error editing deck.",
      });
    }
  };

  return { deleteDeck, addDeck, editADeck };
}

export default useMutationDecks;
