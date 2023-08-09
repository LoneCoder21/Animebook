import "assets/pages/Home/recommendation.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type RecommendationInfo = {
    mal_id: number;
    title: string;
    image: string;
};

export function Recommendation({ info }: { info: RecommendationInfo }) {
    const navigate = useNavigate();

    return (
        <div className="recommendation">
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

// TODO - Handle fetch errors

export default function Recommendations() {
    let [cards, setCards] = useState<RecommendationInfo[]>([]);
    const max_cards = 30;

    useEffect(() => {
        fetch("https://api.jikan.moe/v4/recommendations/anime")
            .then((response) => response.json())
            .then((data) => {
                let new_cards: RecommendationInfo[] = [];
                for (let i = 0; i < max_cards; ++i) {
                    let json_info = data["data"][i]["entry"][0];
                    let info = {
                        mal_id: json_info["mal_id"],
                        title: json_info["title"],
                        image: json_info["images"]["jpg"]["image_url"]
                    } as RecommendationInfo;
                    new_cards.push(info);
                }
                setCards(new_cards);
            });
    }, []);

    return (
        <div className="recommendation_container">
            <h2 className="recommendation_title">Recommendations</h2>
            <div className="recommendations">
                {cards.map((item) => {
                    return <Recommendation key={item.mal_id} info={item} />;
                })}
            </div>
        </div>
    );
}
