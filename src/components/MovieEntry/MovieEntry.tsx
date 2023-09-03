"use client";

import { useFavorites } from "@/app/favorites-provider";
import { useNotifications } from "@/app/notifications-provider";
import { Movie } from "@/types";
import { useState } from "react";

type MovieEntryProps = {
  movie: Movie;
};

export const MovieEntry = ({ movie }: MovieEntryProps) => {
  const { addNotification } = useNotifications();
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const [isFavorite, setIsFavorite] = useState(!!favorites[movie.id]);

  return (
    <div key={movie.id} className="movieEntry">
      <h2>{movie.title}</h2>
      <img src={movie.posterUrl} alt="No image provided" />
      <p>{movie.plot}</p>
      <button
        onClick={() => {
          let message;
          if (isFavorite) {
            removeFavorite(movie);
            message = `Removed '${movie.title}' from favorites`;
          } else {
            addFavorite(movie);
            message = `Added '${movie.title}' to favorites`;
          }
          setIsFavorite(!isFavorite);
          addNotification(message);
        }}
      >
        {isFavorite ? "Remove from favorites" : "Add to favorites"}
      </button>
    </div>
  );
};
