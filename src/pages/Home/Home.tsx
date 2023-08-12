import "assets/pages/Home/home.scss";
import "assets/input/searchfield.scss";

import Recommendations from "./Recommendations";
import SearchForm from "./SearchForm";
import Anime from "./Anime";
import Header from "components/header";
import { SearchFormData } from "./SearchForm";
import { useState } from "react";

export default function Home() {
    let [loading, setLoading] = useState(true);

    let [form, setForm] = useState<SearchFormData>({
        q: "",
        max_score: "10",
        type: "tv",
        status: "complete",
        order_by: "mal_id",
        sort: "desc"
    });

    const updateForm = (data: SearchFormData) => {
        setForm(data);
        setLoading(true);
    };

    return (
        <div>
            <Header />
            <div className="home">
                <SearchForm form={form} setForm={updateForm} />
                <Anime form={form} loading={loading} setLoading={setLoading} />
                <Recommendations />
            </div>
        </div>
    );
}
