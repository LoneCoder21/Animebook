import Header from "components/header";
import { Recommendation } from "pages/Home/Recommendations";
import { useState, Dispatch } from "react";
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
    let [data, setData] = useState<OptionState[]>(createOptionState());

    const animes = [{ url: "https://cdn.myanimelist.net/images/anime/1976/123710.jpg", title: "Shine post" }];

    for (let i = 0; i < 14; ++i) {
        animes.push(animes[0]);
    }

    return (
        <div className="popular">
            <Header />
            <OptionsForm data={data} setDataCallback={setData} />
            <div className="grid_container">
                {animes.map((item) => {
                    return <Recommendation key={item.title} {...item} width="100%" />;
                })}
            </div>
        </div>
    );
}
