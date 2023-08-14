import "assets/pages/Home/anime.scss";
import Animegrid from "components/animegrid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CardInfo } from "../../components/Card";
import { searchFormData } from "./SearchForm";

export default function Anime({ form }: { form: searchFormData }) {
    let formdata = new URLSearchParams(form).toString();
    let [cards, setCards] = useState<CardInfo[] | null>(null);
    let [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
    }, [form]);

    useEffect(() => {
        if (!loading) return;
        fetch("https://api.jikan.moe/v4/anime?" + formdata)
            .then((response) => response.json())
            .then((data) => {
                let new_cards: CardInfo[] = [];
                const cards_size = Object.keys(data["data"]).length;

                for (let i = 0; i < cards_size; ++i) {
                    new_cards.push(CardInfo.fromJson(data["data"][i]));
                }

                setCards(new_cards);
                setLoading(false);
            })
            .catch((error) => {
                navigate("/error", { replace: true });
            });
    }, [loading, navigate]);

    return (
        <div className="anime">
            <Animegrid loading={loading} cards={cards} />
        </div>
    );
}
