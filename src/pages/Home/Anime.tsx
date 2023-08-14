import "assets/pages/Home/anime.scss";
import Animegrid from "components/animegrid";
import { useEffect, useState } from "react";
import { RecommendationInfo } from "./Recommendations";
import { SearchFormData } from "./SearchForm";

export default function Anime({ form }: { form: SearchFormData }) {
    let formdata = new URLSearchParams(form).toString();
    let [cards, setCards] = useState<RecommendationInfo[] | null>(null);
    let [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
    }, [form]);

    useEffect(() => {
        if (!loading) return;
        fetch("https://api.jikan.moe/v4/anime?" + formdata)
            .then((response) => response.json())
            .then((data) => {
                let new_cards: RecommendationInfo[] = [];
                const cards_size = Object.keys(data["data"]).length;

                for (let i = 0; i < cards_size; ++i) {
                    let json_info = data["data"][i];
                    let info = {
                        mal_id: json_info["mal_id"],
                        title: json_info["title"],
                        image: json_info["images"]["jpg"]["image_url"]
                    } as RecommendationInfo;
                    new_cards.push(info);
                }

                let unique_cards: RecommendationInfo[] = [];
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
            .catch((error) => {});
    }, [loading]);

    return (
        <div className="anime">
            <Animegrid loading={loading} cards={cards} />
        </div>
    );
}
