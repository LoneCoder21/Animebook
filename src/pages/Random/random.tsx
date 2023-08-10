import Header from "components/header";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { RotatingLines } from "react-loader-spinner";
import "assets/spinner.scss";

export default function Random() {
    const navigate = useNavigate();

    useEffect(() => {
        fetch("https://api.jikan.moe/v4/random/anime")
            .then((response) => response.json())
            .then((data) => {
                let anime_id = data["data"]["mal_id"] as number;
                navigate(`/listing/${anime_id}`, { replace: true });
            });
    }, [navigate]);

    return (
        <>
            <Header />
            <div className="spinner">
                <RotatingLines strokeColor="black" strokeWidth="5" animationDuration="0.75" width="96" visible={true} />
            </div>
        </>
    );
}
