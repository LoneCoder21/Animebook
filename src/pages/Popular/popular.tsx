import Header from "components/header";
import { Recommendation } from "pages/Home/Recommendations";
import { Fragment, useState, Dispatch } from "react";
import "assets/popular.scss";

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
        <fieldset className="option">
            <p>{type}</p>
            {options.map((item) => {
                return (
                    //each input in action
                    <Fragment key={item}>
                        <input
                            type="radio"
                            id={item}
                            value={item}
                            name={type}
                            defaultChecked={data.option === item}
                            onChange={() => {
                                newfullData[option_index].option = item;
                                setDataCallback(newfullData);
                            }}
                        />
                        <label htmlFor={item}>{item}</label>
                    </Fragment>
                );
            })}
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
                    return <Recommendation key={item.title} {...item} width="83%" />;
                })}
            </div>
        </div>
    );
}
