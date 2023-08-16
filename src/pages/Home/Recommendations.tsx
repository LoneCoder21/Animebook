import { Card, CardInfo } from "components/Card";
import Spinner from "components/loaders/spinner";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Recommendations() {
    let [cards, setCards] = useState<CardInfo[] | null>(null);
    let [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        fetch("https://api.jikan.moe/v4/recommendations/anime")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                let new_cards: CardInfo[] = [];
                const cards_size = Object.keys(data["data"]).length;

                for (let i = 0; i < cards_size; ++i) {
                    new_cards.push(CardInfo.fromJson(data["data"][i]["entry"][0]));
                }

                setCards(new_cards);
                setLoading(false);
            })
            .catch((error) => {
                navigate("/error", { replace: true });
            });
    }, []);

    return (
        <div className="recommendation_container">
            <h2 className="recommendation_title">Recommendations</h2>
            <div className="recommendations">
                {loading && <Spinner />}
                {cards?.map((item, index) => {
                    return <Card key={index} info={item} />;
                })}
            </div>
        </div>
    );
}
