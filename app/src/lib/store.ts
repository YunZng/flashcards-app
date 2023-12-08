import { Deck, User } from "./types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  decks: Deck[];
  user: User | null;
};

type Action = {
  setDeck: (decks: Deck[]) => void;
  removeDeck: (id: string) => void;
  addDeck: (deck: Deck) => void;
  editDeck: (deck: Deck) => void;
  setUser: (user: User) => void;
  clearUser: () => void;
};

// define the initial state
const initialState: State = {
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

    setUser: (user) => {
      set({ user: user });
    },

    clearUser: () => {
      set({ user: null });
    }
  })),
);
