import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

const apiKey = '5e607c34877dd240126fa4e4b2f45b71';

function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query');
  const location = useLocation();

  const handleSearch = async e => {
    e.preventDefault();

    setSearchParams({ query: e.target.query.value });
  };

  useEffect(() => {
    async function setMoviesByQuery() {
      setLoading(true);

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
        setSearched(true);
      }
    }
    if (query) {
      setMoviesByQuery();
    }
  }, [query]);

  return (
    <div>
      <h2>Search for Movies</h2>
      <form onSubmit={handleSearch}>
        <input type="text" name="query" placeholder="Search for a movie..." />
        <b> </b>
        <button type="submit">Search</button>
      </form>
      {loading && <div>Loading...</div>}
      {searched && movies.length > 0 ? (
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`} state={{ from: location }}>
                {movie.title} ({movie.release_date})
              </Link>
            </li>
          ))}
        </ul>
      ) : searched && query?.trim() !== '' ? (
        <p>No movies found.</p>
      ) : null}
      <Outlet />
    </div>
  );
}

export default Movies;


