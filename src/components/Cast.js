import React, { useState, useEffect, Suspense } from "react";
import { useParams} from "react-router-dom";
import { CastImg } from "./Cast.styled";

const ActorItem = ({ actor }) => (
    <div>
        <CastImg
        src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
        alt={actor.name}
        />
        <h3>{actor.name}</h3>
        <p>Character: {actor.character}</p>
    </div>
    );

    const Cast = () => {
    const { movieId } = useParams();
    const [cast, setCast] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const apiKey = "5e607c34877dd240126fa4e4b2f45b71"; 
        const fetchCast = async () => {
        try {
            const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`
            );

            if (!response.ok) {
            throw new Error("Network response was not ok");
            }

            const data = await response.json();
            setCast(data.cast);
        } catch (error) {
            console.error("Error fetching cast details:", error);
        } finally {
            setLoading(false);
        }
        };

        fetchCast();
    }, [movieId]);

    return (
        <div>
            <h2>Cast</h2>
            <Suspense fallback={<div>Loading cast...</div>}>
                {loading ? (
                <div>Loading cast...</div>
                ) : cast.length === 0 ? (
                <div>No cast information available</div>
                ) : (
                <div>
                    {cast.map((actor) => (
                    <ActorItem key={actor.id} actor={actor} />
                    ))}
                </div>
                )}
            </Suspense>
        </div>
    );
};

export default Cast;
