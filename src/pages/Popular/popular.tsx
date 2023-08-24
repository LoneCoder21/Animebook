import Header from "components/header";
import { AnimeCardInfo } from "components/Card";
import { useState, Dispatch, useEffect } from "react";
import "assets/pages/Popular/popular.scss";
import "assets/grid.scss";
import "assets/spinner.scss";
import RadioButton from "components/input/RadioButton";
import Animegrid from "components/animegrid";
import ErrorPage from "pages/errorpage";
import Pagination from "components/input/Pagination";

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
    let newfullData = structuredClone(fullData) as typeof fullData;

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
    maxpaginate,
    page,
    setPage,
    disabled,
    setDataCallback
}: {
    data: OptionState[];
    maxpaginate: number;
    page: number;
    setPage: Dispatch<number>;
    disabled: boolean;
    setDataCallback: Dispatch<OptionState[]>;
}) {
    return (
        <div className="column_container">
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
            <Pagination
                width={4}
                max={maxpaginate}
                page={page}
                disabled={disabled}
                setPage={(p) => {
                    const callback = structuredClone(data) as typeof data;

                    setDataCallback(callback);
                    setPage(p);
                }}
            />
        </div>
    );
}

// TODO - improve state logic

export default function Popular() {
    let [options, setOptions] = useState<OptionState[] | null>(null);
    let [cards, setCards] = useState<AnimeCardInfo[] | null>(null);
    let [page, setPage] = useState(1);
    let [maxpaginate, setMaxPaginate] = useState(1);
    const [error, setError] = useState<string | null>(null);
    let [loading, setLoading] = useState(true);
    let [disable, setDisable] = useState(true);

    useEffect(() => {
        const l = localStorage.getItem("options")!;
        const optionstorage = JSON.parse(l);
        if (optionstorage) {
            setOptions(optionstorage);
        } else {
            setOptions(createOptionState());
        }
    }, []);

    let loadOptions = (e: OptionState[]) => {
        setLoading(true);
        setOptions(e);
        setDisable(true);
        setPage(1);
    };

    useEffect(() => {
        if (!disable) return;
        const timer = setTimeout(() => {
            setDisable(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, [disable]);

    useEffect(() => {
        if (options == null) return;
        const s = JSON.stringify(options);
        localStorage.setItem("options", s);

        const mapped = options.map((item) => ({
            [item.type]: item.option
        }));
        const obj = Object.assign({}, ...mapped);
        fetch(
            "https://api.jikan.moe/v4/top/anime?" +
                new URLSearchParams({
                    ...obj,
                    sfw: "true",
                    page: page.toString()
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

                for (let i = 0; i < cards_size; ++i) {
                    let card = AnimeCardInfo.fromJson(data["data"][i]);
                    new_cards.push(card);
                }

                Promise.all(
                    new_cards.map((card) => {
                        return new Promise<HTMLImageElement>((resolve, reject) => {
                            const img = new Image();
                            img.onload = () => resolve(img);
                            img.onerror = reject;
                            img.src = card.image;
                        });
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
    }, [options]);

    if (error) {
        return <ErrorPage msg={error} />;
    }

    return (
        <div className="popular">
            <Header />
            {options && (
                <OptionsForm
                    data={options}
                    maxpaginate={maxpaginate}
                    page={page}
                    setPage={setPage}
                    setDataCallback={loadOptions}
                    disabled={disable}
                />
            )}

            <Animegrid loading={loading} cards={cards} />
        </div>
    );
}
