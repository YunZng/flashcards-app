import { toast } from "@/components/ui/use-toast";
import { addNewCard, editCard, removeCard } from "@/lib/api";
import { useStore } from "@/lib/store";
import { Card } from "@/lib/types";

function useMutationCards() {
  const _removeCard = useStore((state) => state.removeCard);
  const _addCard = useStore((state) => state.addCard);
  const _editCard = useStore((state) => state.editCard);

  const deleteCard = async (deckId: string, cardId: string) => {
    try {
      await removeCard(deckId, cardId);
      _removeCard(cardId);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to delete",
        description:
          (error as Error).message ||
          "There was an error deleting card.",
      });
    }
  };

  const addCard = async (deckId: string, front: string, back: string) => {
    try {
      const newCard: Card = await addNewCard(deckId, front, back);
      _addCard(newCard);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to add",
        description:
          (error as Error).message ||
          "There was an error adding card.",
      });
    }
  };

  const editACard = async (deckId: string, cardId: string, front?: string, back?: string) => {
    try {
      const card = await editCard(deckId, cardId, front, back);
      _editCard(card);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to edit",
        description:
          (error as Error).message ||
          "There was an error editing card.",
      });
    }
  };

  return { deleteCard, addCard, editACard };
}

export default useMutationCards;
