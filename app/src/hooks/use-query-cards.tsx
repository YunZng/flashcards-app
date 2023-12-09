import { useToast } from "@/components/ui/use-toast";
import { fetchCards } from "@/lib/api";
import { useStore } from "@/lib/store";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function useQueryCards() {
    const { toast } = useToast();
    const cards = useStore((state) => state.cards);
    const setCards = useStore((state) => state.setCard);
    const clearCards = useStore((state) => state.clearCard);
    const { deckId } = useParams();
    const loadCards = async () => {
        try {
            const fetchedCards = await fetchCards(deckId as string);
            setCards(fetchedCards);
        } catch (error) {
            clearCards();
            toast({
                variant: "destructive",
                title: "Failed to fetch comments",
                description:
                    (error as Error).message ||
                    "There was an error loading the comments. Please try again later.",
            });
        }
    };

    useEffect(() => {
        if (deckId) {
            loadCards();
        } else {
            clearCards();
        }
    }, [deckId]);

    return { cards };
}

export default useQueryCards;
