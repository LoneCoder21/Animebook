import "assets/pages/Home/anime.scss";
import Animegrid from "components/animegrid";
import ErrorPage from "pages/errorpage";
import { useEffect, useState } from "react";
import { AnimeCardInfo } from "../../components/Card";
import { searchFormData } from "./SearchForm";

// TODO - Paginate data

export default function Anime({ form }: { form: searchFormData }) {
    let formdata = new URLSearchParams(form).toString();
    let [cards, setCards] = useState<AnimeCardInfo[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    let [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
    }, [form]);

    useEffect(() => {
        if (!loading) return;
        fetch("https://api.jikan.moe/v4/anime?" + formdata)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`${response.status} - ${response.statusText}`);
                }
                return response.json();
            })
            .then((data) => {
                let new_cards: AnimeCardInfo[] = [];
                const cards_size = Object.keys(data["data"]).length;

                for (let i = 0; i < cards_size; ++i) {
                    new_cards.push(AnimeCardInfo.fromJson(data["data"][i]));
                }

                setCards(new_cards);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.toString());
            });
    }, [loading, formdata]);

    if (error) {
        return <ErrorPage msg={error} />;
    }

    return (
        <div className="anime">
            <Animegrid loading={loading} cards={cards} />
        </div>
    );
}
