import "assets/card.scss";
import { useNavigate } from "react-router-dom";

export type CardInfo = {
    mal_id: number;
    title: string;
    image: string;
};

export function Card({ info }: { info: CardInfo }) {
    const navigate = useNavigate();

    return (
        <div className="card">
            <img
                src={info.image}
                alt={info.title}
                onClick={() => {
                    navigate(`/listing/${info.mal_id}`, { replace: false });
                }}
            ></img>
            <p
                onClick={() => {
                    navigate(`/listing/${info.mal_id}`, { replace: false });
                }}
            >
                {info.title}
            </p>
        </div>
    );
}
