"use client";

import { useFavorites } from "@/app/favorites-provider";
import { useNotifications } from "@/app/notifications-provider";
import { Movie } from "@/types";
import Image from "next/image";
import { useState } from "react";

type MovieEntryProps = {
  movie: Movie;
};
const blackStar = String.fromCharCode(parseInt("02605", 16));
const whiteStar = String.fromCharCode(parseInt("02606", 16));

export const MovieEntry = ({ movie }: MovieEntryProps) => {
  const { addNotification } = useNotifications();
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const [isFavorite, setIsFavorite] = useState(!!favorites[movie.id]);

  return (
    <div key={movie.id} className="movieEntry">
      <Image
        fill
        className="movieEntryImage"
        src={movie.posterUrl}
        alt="No image provided"
      />
      <div className="movieEntryInfo">
        <div className="movieEntryHeader">
          <h3 className="title">{movie.title}</h3>
          <button
            className="addFavoriteButton"
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
            {isFavorite ? blackStar : whiteStar}
          </button>
        </div>
        <div className="movieEntryDescription">
          <p>{movie.plot}</p>
        </div>
      </div>
    </div>
  );
};
