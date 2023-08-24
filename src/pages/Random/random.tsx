import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadPage from "pages/Loading/loading";
import ErrorPage from "pages/errorpage";

export default function Random() {
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch("https://api.jikan.moe/v4/random/anime")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`${response.status} - ${response.statusText}`);
                }
                return response.json();
            })
            .then((data) => {
                let anime_id = data["data"]["mal_id"] as number;
                navigate(`/listing/${anime_id}`, { replace: true });
            })
            .catch((err) => {
                setError(err.toString());
            });
    }, [navigate]);

    if (error) {
        return <ErrorPage msg={error} />;
    } else {
        return <LoadPage />;
    }
}
