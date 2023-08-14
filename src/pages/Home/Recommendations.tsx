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
            .then((response) => response.json())
            .then((data) => {
                let new_cards: CardInfo[] = [];
                const cards_size = Object.keys(data["data"]).length;

                for (let i = 0; i < cards_size; ++i) {
                    let json_info = data["data"][i]["entry"][0];
                    let info = {
                        mal_id: json_info["mal_id"],
                        title: json_info["title"],
                        image: json_info["images"]["jpg"]["image_url"]
                    } as CardInfo;

                    new_cards.push(info);
                }

                let unique_cards: CardInfo[] = [];
                let ids = new Set();
                for (let i = 0; i < cards_size; ++i) {
                    if (!ids.has(new_cards[i].mal_id)) {
                        ids.add(new_cards[i].mal_id);
                        unique_cards.push(new_cards[i]);
                    }
                }
                // filter cards by mal id

                setCards(unique_cards);
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
                {cards?.map((item) => {
                    return <Card key={item.mal_id} info={item} />;
                })}
            </div>
        </div>
    );
}
