import React, { useState, useEffect } from "react";
import { Link, Outlet, useParams, useSearchParams, useLocation } from "react-router-dom";

function Movies() {
  const { query } = useParams();
  const { search } = useLocation();
  const [searchQuery, setSearchQuery] = useState(query || "");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = async (e) => {
    e.preventDefault();

    if (searchQuery.trim() === "") {
      setMovies([]);
      return;
    }

    const apiKey = "5e607c34877dd240126fa4e4b2f45b71";
    setLoading(true);

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setMovies(data.results);
      setSearchParams({ query: searchQuery }); 
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
      setSearched(true);
    }
  };

  useEffect(() => {
    if (query) {
      setSearchQuery(query);
    }
  }, [query]);

  useEffect(() => {
    if (searchParams.get("query") !== searchQuery) {
      setSearchQuery(searchParams.get("query") || "");
      handleSearch();
    }
  }, [searchParams]);

  return (
    <div>
      <h2>Search for Movies</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for a movie..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <b> </b>
        <button type="submit">Search</button>
      </form>
      {loading && <div>Loading...</div>}
      {searched && movies.length > 0 ? (
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`}>
                {movie.title} ({movie.release_date})
              </Link>
            </li>
          ))}
        </ul>
      ) : searched && searchQuery.trim() !== "" ? (
        <p>No movies found.</p>
      ) : null}
      <Outlet />
    </div>
  );
}

export default Movies;

