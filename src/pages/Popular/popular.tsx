import Header from "components/header";
import { AnimeCardInfo } from "components/Card";
import { useState, Dispatch, useEffect } from "react";
import "assets/pages/Popular/popular.scss";
import "assets/grid.scss";
import "assets/spinner.scss";
import RadioButton from "components/input/RadioButton";
import Animegrid from "components/animegrid";
import ErrorPage from "pages/errorpage";

const query_options = [
    { type: "type", options: ["tv", "movie", "ova", "special", "ona", "music"] },
    { type: "filter", options: ["airing", "upcoming", "bypopularity", "favorite"] }
];

type OptionState = {
    type: string;
    option: string;
};

function createOptionState(): OptionState[] {
    return query_options.map((item) => {
        return { type: item.type, option: item.options[0] }; // use first option
    });
}

export function Option({
    type,
    option_index,
    options,
    data,
    fullData,
    disabled,
    setDataCallback
}: {
    type: string;
    option_index: number;
    options: string[];
    disabled: boolean;
    data: OptionState;
    fullData: OptionState[];
    setDataCallback: Dispatch<OptionState[]>;
}) {
    let newfullData = fullData.map((item) => {
        return {
            ...item
        };
    }); //clone the full data

    return (
        <fieldset>
            <p>{type}</p>
            <RadioButton
                type={type}
                className="popular_radio_button"
                options={options}
                checked={data.option}
                disabled={disabled}
                setChosenCallback={(value: string) => {
                    newfullData[option_index].option = value;
                    setDataCallback(newfullData);
                }}
            />
        </fieldset>
    );
}

export function OptionsForm({
    data,
    disabled,
    setDataCallback
}: {
    data: OptionState[];
    disabled: boolean;
    setDataCallback: Dispatch<OptionState[]>;
}) {
    return (
        <div className="popular_options">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                }}
            >
                {query_options.map((item, index) => {
                    // for each option
                    return (
                        <Option
                            key={item.type}
                            {...item}
                            fullData={data}
                            data={data[index]}
                            disabled={disabled}
                            setDataCallback={setDataCallback}
                            option_index={index}
                        />
                    );
                })}
            </form>
        </div>
    );
}

// TODO - improve state logic

export default function Popular() {
    let [options, setOptions] = useState<OptionState[]>(createOptionState());
    let [cards, setCards] = useState<AnimeCardInfo[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    let [loading, setLoading] = useState(true);
    let [disable, setDisable] = useState(true);

    let loadOptions = (e: OptionState[]) => {
        setLoading(true);
        setOptions(e);
        setDisable(true);
    };

    useEffect(() => {
        if (!disable) return;
        const timer = setTimeout(() => {
            setDisable(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, [disable]);

    useEffect(() => {
        const mapped = options.map((item) => ({
            [item.type]: item.option
        }));
        const obj = Object.assign({}, ...mapped);
        fetch(
            "https://api.jikan.moe/v4/top/anime?" +
                new URLSearchParams({
                    ...obj,
                    sfw: "true"
                })
        )
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
    }, [options]);

    if (error) {
        return <ErrorPage msg={error} />;
    }

    return (
        <div className="popular">
            <Header />
            <OptionsForm data={options} setDataCallback={loadOptions} disabled={disable} />
            <Animegrid loading={loading} cards={cards} />
        </div>
    );
}
