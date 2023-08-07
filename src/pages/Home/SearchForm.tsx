import "assets/pages/Home/searchform.scss";
import "assets/input/slider.scss";
import "assets/input/date.scss";
import RadioButtonHorizontal from "components/input/RadioButton";
import { useState } from "react";

import { BsSearch } from "react-icons/bs";

function NamedComponent({ type, children }: { type: string; children: JSX.Element }) {
    return (
        <div className="name">
            <span>{type}</span>
            {children}
        </div>
    );
}

export default function SearchForm() {
    const datenow = new Date();
    const DateToday = datenow.toLocaleDateString("en-CA");

    let [search, setSearch] = useState("");
    let [score, setScore] = useState(10);
    let [type, setType] = useState("tv");
    let [status, setStatus] = useState("airing");
    let [order, setOrder] = useState("mal_id");
    let [sort, setSort] = useState("descending");
    let [date, setDate] = useState(DateToday);

    return (
        <form
            className="searchform"
            onSubmit={(e) => {
                console.log("submitting");
                e.preventDefault();
            }}
        >
            <fieldset className="search">
                <BsSearch className="icon" size={20} />
                <input
                    id="search"
                    type="text"
                    placeholder="Search anime"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                    }}
                />
                <button className="search_button" type="submit">
                    Search
                </button>
            </fieldset>
            <NamedComponent type="score">
                <input
                    type="range"
                    min="0"
                    max="10"
                    className="slider"
                    id="score"
                    value={score}
                    onChange={(e) => {
                        setScore(parseInt(e.target.value));
                    }}
                ></input>
            </NamedComponent>
            <NamedComponent type="type">
                <RadioButtonHorizontal
                    type="type"
                    className="form_radio_button"
                    options={["tv", "movie", "ova", "special", "ona", "music"]}
                    checked={type}
                    setChosenCallback={setType}
                />
            </NamedComponent>
            <NamedComponent type="status">
                <RadioButtonHorizontal
                    type="status"
                    className="form_radio_button"
                    options={["airing", "complete", "upcoming"]}
                    checked={status}
                    setChosenCallback={setStatus}
                />
            </NamedComponent>
            <NamedComponent type="Order By">
                <RadioButtonHorizontal
                    type="orderby"
                    className="form_radio_button"
                    options={[
                        "mal_id",
                        "title",
                        "start_date",
                        "end_date",
                        "episodes",
                        "score",
                        "scored_by",
                        "rank",
                        "popularity",
                        "members",
                        "favorites"
                    ]}
                    checked={order}
                    setChosenCallback={setOrder}
                />
            </NamedComponent>
            <NamedComponent type="sort">
                <RadioButtonHorizontal
                    type="sort"
                    className="form_radio_button"
                    options={["descending", "ascending"]}
                    checked={sort}
                    setChosenCallback={setSort}
                />
            </NamedComponent>
            <NamedComponent type="Max Date">
                <input
                    type="date"
                    id="startdate"
                    value={date}
                    onChange={(e) => {
                        setDate(e.target.value);
                    }}
                ></input>
            </NamedComponent>
        </form>
    );
}
