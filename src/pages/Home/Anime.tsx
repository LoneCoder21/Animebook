import "assets/pages/Home/anime.scss";
import Animegrid from "components/animegrid";
import { Dispatch, useEffect, useState } from "react";
import { AnimeCardInfo } from "../../components/Card";
import { searchFormData } from "./SearchForm";

// TODO - Paginate data

export default function Anime({ form, setError }: { form: searchFormData; setError: Dispatch<string | null> }) {
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

                const loadImage = (src: string) => {
                    return new Promise<HTMLImageElement>((resolve, reject) => {
                        const img = new Image();
                        img.onload = () => resolve(img);
                        img.onerror = reject;
                        img.src = src;
                    });
                };

                for (let i = 0; i < cards_size; ++i) {
                    let card = AnimeCardInfo.fromJson(data["data"][i]);
                    new_cards.push(card);
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
                });
            })
            .catch((err) => {
                setError(err.toString());
            });
    }, [loading, formdata, setError]);

    return (
        <div className="anime">
            <Animegrid loading={loading} cards={cards} />
        </div>
    );
}
