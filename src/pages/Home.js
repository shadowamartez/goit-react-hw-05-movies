import React, { useState, useEffect, Suspense } from "react";
import { Link, Outlet } from "react-router-dom";

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const apiKey = "5e607c34877dd240126fa4e4b2f45b71"; 
        const fetchTrendingMovies = async () => {
        try {
            const response = await fetch(
            `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`
            );

            if (!response.ok) {
            throw new Error("Network response was not ok");
            }

            const data = await response.json();
            setMovies(data.results);
        } catch (error) {
            console.error("Error fetching trending movies:", error);
        } finally {
            setLoading(false);
        }
        };

        fetchTrendingMovies();
    }, []);

    return (
        <main>
        <h1>Trending today</h1>
        {loading ? (
            <div>Loading movies...</div>
        ) : (
            <ul>
            {movies.map((movie) => (
                <li key={movie.id}>
                <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
                </li>
            ))}
            </ul>
        )}
        <Suspense fallback={<div>Loading subpage...</div>}>
            <Outlet />
        </Suspense>
        </main>
    );
};

export default Home;

