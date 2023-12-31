import "assets/pages/Home/searchform.scss";
import "assets/input/slider.scss";
import "assets/input/select.scss";
import RadioButton from "components/input/RadioButton";
import { Dispatch, useEffect, useState } from "react";

import { BsSearch } from "react-icons/bs";
import Pagination from "components/input/Pagination";
import { getLocalStorage, setLocalStorage } from "data/storage";
import useTimeout from "hooks/useTimeout";

export type searchFormData = {
    q: string;
    max_score: string;
    type: string;
    status: string;
    order_by: string;
    sort: string;
    sfw: string;
    page: string;
};

export const defaultFormData = {
    q: "",
    max_score: "10",
    type: "tv",
    status: "complete",
    order_by: "mal_id",
    sort: "desc",
    sfw: "true",
    page: "1"
} as searchFormData;

function LabelContainer({ type, children }: { type: string; children: JSX.Element }) {
    return (
        <div className="name">
            <span>{type}</span>
            {children}
        </div>
    );
}

export default function SearchForm({
    maxpaginate,
    updateForm,
    setMaxPaginate
}: {
    maxpaginate: number;
    updateForm: Dispatch<searchFormData>;
    setMaxPaginate: Dispatch<number>;
}) {
    let [form, setFormData] = useState<searchFormData | null>(null);
    let [disable, setDisable] = useState(false);
    useTimeout(1000, disable, setDisable);

    useEffect(() => {
        const data = getLocalStorage("form", defaultFormData);
        setFormData(data);
        updateForm(data);
    }, [updateForm]);

    useEffect(() => {
        if (form == null) return;
        setLocalStorage("form", form);
    }, [form]);

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
                            setFormData({ ...formdata, q: e.target.value, page: "1" });
                            setMaxPaginate(1);
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
                            setFormData({ ...formdata, max_score: e.target.value, page: "1" });
                            setMaxPaginate(1);
                        }}
                    ></input>
                </LabelContainer>
                <LabelContainer type="type">
                    <select
                        defaultValue={formdata.type}
                        onChange={(e) => {
                            setFormData({ ...formdata, type: e.target.value, page: "1" });
                            setMaxPaginate(1);
                        }}
                    >
                        {["tv", "movie", "ova", "special", "ona", "music"].map((value) => {
                            return (
                                <option key={value} value={value}>
                                    {value}
                                </option>
                            );
                        })}
                    </select>
                </LabelContainer>
                <LabelContainer type="status">
                    <select
                        defaultValue={formdata.status}
                        onChange={(e) => {
                            setFormData({ ...formdata, status: e.target.value, page: "1" });
                            setMaxPaginate(1);
                        }}
                    >
                        {["complete", "airing", "upcoming"].map((value) => {
                            return (
                                <option key={value} value={value}>
                                    {value}
                                </option>
                            );
                        })}
                    </select>
                </LabelContainer>
                <LabelContainer type="Order By">
                    <select
                        defaultValue={formdata.order_by}
                        onChange={(e) => {
                            setFormData({ ...formdata, order_by: e.target.value });
                        }}
                    >
                        {[
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
                        ].map((value) => {
                            return (
                                <option key={value} value={value}>
                                    {value}
                                </option>
                            );
                        })}
                    </select>
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
                <LabelContainer type="page">
                    <Pagination
                        width={1}
                        max={maxpaginate}
                        disabled={false}
                        page={parseInt(formdata.page)}
                        setPage={(num) => {
                            setFormData({ ...formdata, page: num.toString() });
                        }}
                    />
                </LabelContainer>
            </form>
        );
    } else {
        return <></>;
    }
}
