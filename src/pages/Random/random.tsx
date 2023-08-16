import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import LoadPage from "pages/Loading/loading";

export default function Random() {
    const navigate = useNavigate();

    useEffect(() => {
        fetch("https://api.jikan.moe/v4/random/anime")
            .then((response) => response.json())
            .then((data) => {
                let anime_id = data["data"]["mal_id"] as number;
                navigate(`/listing/${anime_id}`, { replace: true });
            })
            .catch((error) => {
                navigate("/error", { replace: true });
            });
    }, [navigate]);

    return <LoadPage />;
}
