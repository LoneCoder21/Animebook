import "assets/pages/Home/searchform.scss";
import "assets/input/slider.scss";
import RadioButton from "components/input/RadioButton";
import { Dispatch, useEffect, useState } from "react";

import { BsSearch } from "react-icons/bs";

export type searchFormData = {
    q: string;
    max_score: string;
    type: string;
    status: string;
    order_by: string;
    sort: string;
    sfw: string;
};

export const defaultFormData = {
    q: "",
    max_score: "10",
    type: "tv",
    status: "complete",
    order_by: "mal_id",
    sort: "desc",
    sfw: "true"
} as searchFormData;

function LabelContainer({ type, children }: { type: string; children: JSX.Element }) {
    return (
        <div className="name">
            <span>{type}</span>
            {children}
        </div>
    );
}

export default function SearchForm({ updateForm }: { updateForm: Dispatch<searchFormData> }) {
    let [form, setFormData] = useState<searchFormData | null>(null);
    let [disable, setDisable] = useState(false);

    useEffect(() => {
        const l = localStorage.getItem("form")!;
        const formstorage = JSON.parse(l);
        if (formstorage) {
            setFormData(formstorage);
        } else {
            setFormData(defaultFormData);
        }
    }, []);

    useEffect(() => {
        if (form == null) {
            return;
        }
        const s = JSON.stringify(form);
        localStorage.setItem("form", s);
    }, [form]);

    useEffect(() => {
        if (!disable) return;
        const timer = setTimeout(() => {
            setDisable(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, [disable]);

    if (form !== null) {
        let formdata = form;
        return (
            <form
                className="searchform"
                onSubmit={(e) => {
                    e.preventDefault();
                    setDisable(true);
                    updateForm(formdata);
                }}
            >
                <fieldset className="search">
                    <BsSearch className="icon" size={20} />
                    <input
                        id="search"
                        type="text"
                        placeholder="Search anime"
                        value={formdata.q}
                        onChange={(e) => {
                            setFormData({ ...formdata, q: e.target.value });
                        }}
                    />
                    <button className={"search_button " + (disable ? "disabled" : "")} type="submit" disabled={disable}>
                        Search
                    </button>
                </fieldset>
                <LabelContainer type="score">
                    <input
                        type="range"
                        min="0"
                        max="10"
                        className="slider"
                        id="score"
                        value={formdata.max_score}
                        onChange={(e) => {
                            setFormData({ ...formdata, max_score: e.target.value });
                        }}
                    ></input>
                </LabelContainer>
                <LabelContainer type="type">
                    <RadioButton
                        type="type"
                        className="form_radio_button"
                        options={["tv", "movie", "ova", "special", "ona", "music"]}
                        checked={formdata.type}
                        isVertical={true}
                        setChosenCallback={(type) => {
                            setFormData({ ...formdata, type: type });
                        }}
                    />
                </LabelContainer>
                <LabelContainer type="status">
                    <RadioButton
                        type="status"
                        className="form_radio_button"
                        options={["complete", "airing", "upcoming"]}
                        checked={formdata.status}
                        isVertical={true}
                        setChosenCallback={(status) => {
                            setFormData({ ...formdata, status: status });
                        }}
                    />
                </LabelContainer>
                <LabelContainer type="Order By">
                    <RadioButton
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
                        checked={formdata.order_by}
                        isVertical={true}
                        setChosenCallback={(order) => {
                            setFormData({ ...formdata, order_by: order });
                        }}
                    />
                </LabelContainer>
                <LabelContainer type="sort">
                    <RadioButton
                        type="sort"
                        className="form_radio_button"
                        options={["descending", "ascending"]}
                        checked={formdata.sort === "desc" ? "descending" : "ascending"}
                        isVertical={true}
                        setChosenCallback={(sort) => {
                            let sorttype = sort === "descending" ? "desc" : "asc";
                            setFormData({ ...formdata, sort: sorttype });
                        }}
                    />
                </LabelContainer>
            </form>
        );
    } else {
        return <></>;
    }
}
