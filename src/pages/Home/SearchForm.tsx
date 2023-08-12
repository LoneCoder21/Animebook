import "assets/pages/Home/searchform.scss";
import "assets/input/slider.scss";
import RadioButtonHorizontal from "components/input/RadioButton";
import { Dispatch, useEffect, useState } from "react";

import { BsSearch } from "react-icons/bs";

function NamedComponent({ type, children }: { type: string; children: JSX.Element }) {
    return (
        <div className="name">
            <span>{type}</span>
            {children}
        </div>
    );
}

export type SearchFormData = {
    q: string;
    max_score: string;
    type: string;
    status: string;
    order_by: string;
    sort: string;
};

export default function SearchForm({ form, setForm }: { form: SearchFormData; setForm: Dispatch<SearchFormData> }) {
    let [disable, setDisable] = useState(false);

    useEffect(() => {
        if (!disable) return;
        const timer = setTimeout(() => {
            setDisable(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, [disable]);

    return (
        <form
            className="searchform"
            onSubmit={(e) => {
                console.log("submitting");
                e.preventDefault();
                setDisable(true);
            }}
        >
            <fieldset className="search">
                <BsSearch className="icon" size={20} />
                <input
                    id="search"
                    type="text"
                    placeholder="Search anime"
                    value={form.q}
                    onChange={(e) => {
                        setForm({ ...form, q: e.target.value });
                    }}
                />
                <button className={"search_button " + (disable ? "disabled" : "")} type="submit" disabled={disable}>
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
                    value={form.max_score}
                    onChange={(e) => {
                        setForm({ ...form, max_score: e.target.value });
                    }}
                ></input>
            </NamedComponent>
            <NamedComponent type="type">
                <RadioButtonHorizontal
                    type="type"
                    className="form_radio_button"
                    options={["tv", "movie", "ova", "special", "ona", "music"]}
                    checked={form.type}
                    setChosenCallback={(type) => {
                        setForm({ ...form, type: type });
                    }}
                />
            </NamedComponent>
            <NamedComponent type="status">
                <RadioButtonHorizontal
                    type="status"
                    className="form_radio_button"
                    options={["airing", "complete", "upcoming"]}
                    checked={form.status}
                    setChosenCallback={(status) => {
                        setForm({ ...form, status: status });
                    }}
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
                    checked={form.order_by}
                    setChosenCallback={(order) => {
                        setForm({ ...form, order_by: order });
                    }}
                />
            </NamedComponent>
            <NamedComponent type="sort">
                <RadioButtonHorizontal
                    type="sort"
                    className="form_radio_button"
                    options={["descending", "ascending"]}
                    checked={form.sort === "desc" ? "descending" : "ascending"}
                    setChosenCallback={(sort) => {
                        let sorttype = sort === "descending" ? "desc" : "asc";
                        setForm({ ...form, sort: sorttype });
                    }}
                />
            </NamedComponent>
        </form>
    );
}
