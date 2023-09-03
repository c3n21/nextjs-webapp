import { MovieNode } from "@/types";
import MovieEntry from "@/components/MovieEntry";
import Link from "next/link";

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
    const { edges } = moviesCollection as { edges: MovieNode[] };
    return edges;
  } catch (e) {
    console.log("error", e);
    return [];
  }
}

const Page = async () => {
  const edges = await fetchEdges();
  return (
    <div>
      <div className="moviesContainer">
        <div className="gridHeader">
          <h1>MOVIES</h1>
          <Link href="/favorites" className="next-link">
            Favorites
          </Link>
        </div>

        {edges.map((edge) => (
          <MovieEntry key={edge.node.id} movie={edge.node} />
        ))}
      </div>
    </div>
  );
};

export default Page;
