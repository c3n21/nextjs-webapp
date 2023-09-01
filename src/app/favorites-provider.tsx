"use client";

import { Movie } from "@/types";
import { createContext, useContext } from "react";

type FavoriteManager = {
  favorites: Map<string, Movie>;
  removeFavorite: (movieId: string) => void;
  addFavorite: (movie: Movie) => void;
};

const favorites = new Map<string, Movie>();

function addFavorite(movie: Movie) {
  favorites.set(movie.id, movie);
}

function removeFavorite(movieId: string) {
  favorites.delete(movieId);
}

export const FavoriteContext = createContext<FavoriteManager>({
  favorites,
  addFavorite,
  removeFavorite,
});

export const useFavorites = () => {
  const { favorites, addFavorite, removeFavorite } =
    useContext(FavoriteContext);
  return { favorites, addFavorite, removeFavorite };
};

export const FavoriteProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const favoriteManager = useFavorites();
  return (
    <FavoriteContext.Provider value={favoriteManager}>
      {children}
    </FavoriteContext.Provider>
  );
};
