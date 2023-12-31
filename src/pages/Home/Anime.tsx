import "assets/pages/Home/anime.scss";
import Animegrid from "components/animegrid";
import { loadImage } from "data/image";
import { Dispatch, useEffect, useState } from "react";
import { AnimeCardInfo } from "../../components/Card";
import { searchFormData } from "./SearchForm";

export default function Anime({
    form,
    setError,
    setMaxPaginate
}: {
    form: searchFormData;
    setError: Dispatch<string | null>;
    setMaxPaginate: Dispatch<number>;
}) {
    let formdata = new URLSearchParams(form).toString();
    let [cards, setCards] = useState<AnimeCardInfo[] | null>(null);
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

                Promise.all(
                    new_cards.map((card) => {
                        return loadImage(card.image);
                    })
                ).then((images: HTMLImageElement[]) => {
                    images.forEach((image, index) => {
                        new_cards[index].image_width = image.width;
                        new_cards[index].image_height = image.height;
                    });
                    setCards(new_cards);
                    setLoading(false);
                    setMaxPaginate(data["pagination"]["last_visible_page"]);
                });
            })
            .catch((err) => {
                setError(err.toString());
            });
    }, [loading, formdata, setError, setMaxPaginate]);

    return (
        <div className="anime">
            <Animegrid loading={loading} cards={cards} />
        </div>
    );
}
