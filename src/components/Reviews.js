import React, { useState, useEffect, Suspense } from "react";
import { useParams } from "react-router-dom";

const Reviews = () => {
    const { movieId } = useParams();
    const API_KEY = "5e607c34877dd240126fa4e4b2f45b71"; 
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchMovieReviews = async () => {
        try {
            const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${API_KEY}`
            );
            if (!response.ok) {
            throw new Error("Network response was not ok");
            }
            const data = await response.json();
            setReviews(data.results);
        } catch (error) {
            console.error("Error fetching movie reviews:", error);
        }
        };

        fetchMovieReviews();
    }, [movieId]);

    return (
        <div>
        <Suspense fallback={<div>Loading cast...</div>}>
            {reviews.length > 0 ? (
                <ul>
                    {reviews.map((review) => (
                    <li key={review.id}>
                        <h3>{review.author}</h3>
                        <p>{review.content}</p>
                    </li>
                    ))}
                </ul>
                ) : (
                <p>No reviews available for this movie.</p>
                )}
            </Suspense>
        </div>
    );
};

export default Reviews;

