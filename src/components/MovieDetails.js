import React, { useState, useEffect, lazy } from "react";
import { useParams, Link, Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { MovieImg, MovieDetailsContainer, MovieInfo } from "./MovieDetails.styled";

const Cast = lazy(() => import("./Cast"));
const Reviews = lazy(() => import("./Reviews"));

const MovieDetails = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const apiKey = "5e607c34877dd240126fa4e4b2f45b71";
        const fetchMovieDetails = async () => {
        try {
            const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&append_to_response=credits,reviews`
            );

            if (!response.ok) {
            throw new Error("Network response was not ok");
            }

            const data = await response.json();
            setMovie(data);
        } catch (error) {
            console.error("Error fetching movie details:", error);
        } finally {
            setLoading(false);
        }
        };

        fetchMovieDetails();
    }, [movieId]);

    if (loading) {
        return <div>Loading movie details...</div>;
    }

    if (!movie) {
        return <div>Movie not found</div>;
    }

    return (
        <div>
        <div>
            <button onClick={() => navigate(location?.state?.from ?? '/')}>Go back</button>
        </div>
        <MovieDetailsContainer>
            <MovieImg
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            />
            <MovieInfo>
            <h2>{movie.title}</h2>
            <h3>Overview</h3>
            <p>{movie.overview}</p>
            <h3>Release Date: </h3>
            <p>{movie.release_date}</p>
            <h3>Runtime: </h3>
            <p>{movie.runtime} minutes</p>
            <h3>Genres: </h3>
            <p>{movie.genres.map((genre) => genre.name).join(", ")}</p>
            </MovieInfo>
        </MovieDetailsContainer>

        <ul>
            <li>
            <Link to={`/movies/${movieId}/cast`}>Cast</Link>
            </li>
            <li>
            <Link to={`/movies/${movieId}/reviews`}>Reviews</Link>
            </li>
        </ul>

        <Routes>
            <Route path="cast" element={<Cast movieId={movieId} />} />
            <Route path="reviews" element={<Reviews movieId={movieId} />} />
        </Routes>
        </div>
    );
};

export default MovieDetails;
