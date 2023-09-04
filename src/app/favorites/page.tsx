"use client";

import MovieEntry from "@/components/MovieEntry";
import { useFavorites } from "../favorites-provider";
import Link from "next/link";

import "@/app/globals.css";

export const Page = () => {
  const { favorites } = useFavorites();

  return (
    <div>
      <div className="moviesContainer">
        <div className="gridHeader">
          <h1>FAVORITES</h1>
          <Link href="/" className="next-link">
            Movies
          </Link>
        </div>

        {Object.values(favorites).map((movie) => (
          <MovieEntry key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Page;
