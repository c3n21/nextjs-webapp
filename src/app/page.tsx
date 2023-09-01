type Movie = {
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

type Node = {
  node: Movie;
};

export async function fetchEdges() {
  try {
    const response = await fetch(process.env.GRAPHQL_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: process.env.API_KEY,
      },
      body: JSON.stringify({
        query: `
  {
    moviesCollection {
      edges {
        node {
          id
          title
          year
          runtime
          genres
          director
          actors
          plot
          posterUrl
        }
      }
    }
  }
    `,
      }),
      next: { revalidate: 10 },
    });
    const { data } = await response.json();
    const { moviesCollection } = data;
    const { edges } = moviesCollection as { edges: Node[] };
    return edges;
  } catch (e) {
    console.log("error", e);
    return [];
  }
}

type MovieEntryProps = {
  movie: Movie;
};

const MovieEntry = ({ movie }: MovieEntryProps) => {
  return (
    <div key={movie.id} className="movieEntry">
      <h2>{movie.title}</h2>
      <img src={movie.posterUrl} alt="No image provided" />
      <p>{movie.plot}</p>
      <button>Favourite</button>
    </div>
  );
};

const Movies = async () => {
  const edges = await fetchEdges();
  return (
    <div>
      <h1>MOVIES</h1>
      {edges.map((edge) => (
        <MovieEntry key={edge.node.id} movie={edge.node} />
      ))}
    </div>
  );
};

export default Movies;
