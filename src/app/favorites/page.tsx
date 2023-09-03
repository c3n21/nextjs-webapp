"use client";

import MovieEntry from "@/components/MovieEntry";
import { useFavorites } from "../favorites-provider";
import Link from "next/link";

export const Page = () => {
  const { favorites } = useFavorites();

  return (
    <div>
      <h1>FAVORITES</h1>
      <Link href="/">Movies</Link>
      <div className="moviesContainer">
        {Object.values(favorites).map((movie) => (
          <MovieEntry key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Page;
