import "assets/pages/Home/home.scss";
import "assets/input/searchfield.scss";

import Recommendations from "./Recommendations";
import SearchForm, { defaultFormData } from "./SearchForm";
import Anime from "./Anime";
import Header from "components/header";
import { SearchFormData } from "./SearchForm";
import { useState } from "react";

export default function Home() {
    let [form, setFormRequest] = useState<SearchFormData>(defaultFormData);

    return (
        <div>
            <Header />
            <div className="home">
                <SearchForm updateForm={setFormRequest} />
                <Anime form={form} />
            </div>
        </div>
    );
}
