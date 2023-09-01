"use client";

import { useNotifications } from "@/app/notifications-provider";
import { Movie } from "@/types";
import { useState } from "react";

type MovieEntryProps = {
  movie: Movie;
};

export const MovieEntry = ({ movie }: MovieEntryProps) => {
  const { addNotification, removeNotification } = useNotifications();
  const [isFavorite, setIsFavorite] = useState(false);
  return (
    <div key={movie.id} className="movieEntry">
      <h2>{movie.title}</h2>
      <img src={movie.posterUrl} alt="No image provided" />
      <p>{movie.plot}</p>
      <button
        onClick={() => {
          if (isFavorite) {
            removeNotification(movie.id);
          } else {
            addNotification(movie.id);
          }
          setIsFavorite(!isFavorite);
        }}
      >
        {isFavorite ? "Remove from favorites" : "Add to favorites"}
      </button>
    </div>
  );
};
