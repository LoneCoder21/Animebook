import "assets/pages/Home/home.scss";
import "assets/input/searchfield.scss";

import SearchForm, { defaultFormData } from "./SearchForm";
import Anime from "./Anime";
import Header from "components/header";
import { searchFormData } from "./SearchForm";
import { useState } from "react";

export default function Home() {
    let [form, setFormRequest] = useState<searchFormData>(defaultFormData);

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
