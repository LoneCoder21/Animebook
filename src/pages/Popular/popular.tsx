import Header from "components/header";
import { Recommendation, RecommendationInfo } from "pages/Home/Recommendations";
import { useState, Dispatch, useEffect } from "react";
import "assets/pages/Popular/popular.scss";
import RadioButtonHorizontal from "components/input/RadioButton";

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
    setDataCallback
}: {
    type: string;
    option_index: number;
    options: string[];
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
            <RadioButtonHorizontal
                type={type}
                className="popular_radio_button"
                options={options}
                checked={data.option}
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
    setDataCallback
}: {
    data: OptionState[];
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
    let [cards, setCards] = useState<RecommendationInfo[]>([]);

    const mapped = options.map((item) => ({
        [item.type]: item.option
    }));
    const obj = Object.assign({}, ...mapped);
    // converts from array of objects to one object with all properties

    useEffect(() => {
        fetch(
            "https://api.jikan.moe/v4/top/anime?" +
                new URLSearchParams({
                    ...obj,
                    sfw: "true"
                })
        )
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
            });
    }, [options]);

    return (
        <div className="popular">
            <Header />
            <OptionsForm data={options} setDataCallback={setOptions} />
            <div className="grid_container">
                {cards.map((item) => {
                    return <Recommendation key={item.mal_id} info={item} />;
                })}
            </div>
        </div>
    );
}
