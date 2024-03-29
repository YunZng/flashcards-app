export type Card = {
  front: string;
  back: string;
  id: string;
  deckId: string;
};

export type Deck = {
  id: string;
  title: string;
  image?: string;
  numberOfCards: number;
  userId: number;
};

export type User = {
  username: string;
  displayName: string;
  avatar?: string;
  id: number;
}
