import { Deck, User } from "./types";
import { getAuthenticatedUser, getAuthenticatedUserToken, setAuthenticatedUserToken } from "./auth.ts";

const API_URL = import.meta.env.VITE_API_URL;


export const fetchDecks = async (): Promise<Deck[]> => {
  const token = getAuthenticatedUserToken();
  const response = await fetch(`${API_URL}/decks`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const responseJson = await response.json();

  if (!response.ok) {
    throw new Error(
      `Error: ${response.status} - ${responseJson.message || response.statusText
      }`,
    );
  }

  return responseJson.data;
};

export const editDeck = async (title: string, id: string): Promise<Deck> => {
  const token = getAuthenticatedUserToken();
  const response = await fetch(`${API_URL}/decks/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({title})
  });
  const responseJson = await response.json();

  if (!response.ok) {
    throw new Error(
      `Error: ${response.status} - ${responseJson.message || response.statusText
      }`,
    );
  }

  return responseJson.data;
};

export const removeDeck = async (id: string): Promise<void> => {
  const token = getAuthenticatedUserToken();
  const response = await fetch(`${API_URL}/decks/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const responseJson = await response.json();

  if (!response.ok) {
    throw new Error(
      `Error: ${response.status} - ${responseJson.message || response.statusText
      }`,
    );
  }

  return responseJson.data;
};

export const addNewDeck = async (title: string): Promise<Deck> => {
  const token = getAuthenticatedUserToken();
  const response = await fetch(`${API_URL}/decks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title })
  });
  const responseJson = await response.json();

  if (!response.ok) {
    throw new Error(
      `Error: ${response.status} - ${responseJson.message || response.statusText
      }`,
    );
  }
  return responseJson.data;
};

export const register = async (
  username: string,
  displayName: string,
  avartar: string,
  password: string,
): Promise<any> => {
  const response = await fetch(`${API_URL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, displayName, avartar, password }),
  });
  const responseJson = await response.json();

  if (!response.ok) {
    throw new Error(
      `Error: ${response.status} - ${responseJson.message || response.statusText
      }`,
    );
  }

  return responseJson.data;
}

export const login = async (
  username: string,
  password: string,
): Promise<User> => {
  const response = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const responseJson = await response.json();

  if (!response.ok) {
    throw new Error(
      `Error: ${response.status} - ${responseJson.message || response.statusText
      }`,
    );
  }

  const { access_token } = responseJson.data;

  if (!access_token) {
    throw new Error("Authentication token is missing from the response!");
  }

  setAuthenticatedUserToken(access_token);
  const user = getAuthenticatedUser();
  return user;
};

