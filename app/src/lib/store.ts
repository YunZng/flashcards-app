import { Card, Deck, User } from "./types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  selectedDeckId: string | null;
  cards: Card[];
  decks: Deck[];
  user: User | null;
};

type Action = {
  setDeck: (decks: Deck[]) => void;
  removeDeck: (id: string) => void;
  addDeck: (deck: Deck) => void;
  editDeck: (deck: Deck) => void;

  setCard: (cards: Card[]) => void;
  removeCard: (id: string) => void;
  addCard: (card: Card) => void;
  editCard: (card: Card) => void;
  clearCard: () => void;

  setSelectedDeckId: (id: string) => void;
  // clearSelectedDeckId: () => void;

  setUser: (user: User) => void;
  clearUser: () => void;
};

// define the initial state
const initialState: State = {
  selectedDeckId: null,
  cards: [],
  decks: [],
  user: null
};

export const useStore = create(
  immer<State & Action>((set, get) => ({
    ...initialState,

    setDeck: (decks) => set({ decks }),

    removeDeck: (id) => {
      const newDecks = get().decks.filter((deck) => deck.id !== id);
      set({ decks: newDecks });
    },

    editDeck(deck) {
      const newDecks = get().decks.map((_deck) =>
        _deck.id === deck.id ? deck : _deck,
      );
      set({ decks: newDecks });
    },

    addDeck: (deck) => {
      const newDecks: Deck[] = [deck, ...get().decks];
      set({ decks: newDecks });
    },
    
    // //////////////////////////////////////////////////////////////////////////
    
    setCard: (cards) => set({ cards }),

    removeCard: (id) => {
      const target_card = get().cards.find((card) => card.id === id)!;
      const newCards = get().cards.filter((card) => card.id !== id);
      set({
        cards: newCards,
        decks: get().decks.map((deck) => {
          if (deck.id === target_card.deckId) {
            return {
              ...deck,
              numberOfCards: deck.numberOfCards - 1,
            };
          }
          return deck;
        }),
      });
    },

    editCard(card) {
      const newCards = get().cards.map((_card) =>
        _card.id === card.id ? card : _card,
      );
      set({ cards: newCards });
    },

    addCard: (card) => {
      const newCards: Card[] = [card, ...get().cards];
      set({
        cards: newCards,
        decks: get().decks.map((deck) => {
          if (deck.id === card.deckId) {
            return {
              ...deck,
              numberOfCards: deck.numberOfCards + 1,
            };
          }
          return deck;
        }),
      });
    },

    clearCard: () => {
      set({ cards: [] });
    },

    // //////////////////////////////////////////////////////////////////////////
    
    setSelectedDeckId: (id) => set({ selectedDeckId: id }),
    
    // clearSelectedDeckId: () => set({ selectedDeckId: null }),
    
    // //////////////////////////////////////////////////////////////////////////
    
    setUser: (user) => {
      set({ user: user });
    },

    clearUser: () => {
      set({ user: null });
    }
  })),
);
