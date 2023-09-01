export type Movie = {
  id: string;
  title: string;
  year: string;
  runtime: string;
  genres: string;
  director: string;
  actors: string[];
  plot: string;
  posterUrl: string;
};

export type MovieNode = {
  node: Movie;
};
