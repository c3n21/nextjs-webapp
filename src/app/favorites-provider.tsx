"use client";

import { Movie } from "@/types";
import { createContext, useContext, useMemo, useState } from "react";

type Favorites = Record<Movie["id"], Movie>;

type FavoriteManager = {
  favorites: Favorites;
  removeFavorite: (movie: Movie) => void;
  addFavorite: (movie: Movie) => void;
};

export const FavoriteContext = createContext<FavoriteManager>({
  favorites: {},
  addFavorite: () => {
    throw new Error("Missing FavoriteProvider");
  },
  removeFavorite: () => {
    throw new Error("Missing FavoriteProvider");
  },
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
  const [favorites, setFavorites] = useState<Favorites>({});

  const favoriteManager = useMemo(
    () => ({
      favorites,
      addFavorite: (movie: Movie) => {
        setFavorites((prev) => ({ ...prev, [movie.id]: movie }));
      },
      removeFavorite: (movie: Movie) => {
        setFavorites((prev) => {
          const { [movie.id]: _, ...rest } = prev;
          return rest;
        });
      },
    }),
    [favorites]
  );

  return (
    <FavoriteContext.Provider value={favoriteManager}>
      {children}
    </FavoriteContext.Provider>
  );
};
