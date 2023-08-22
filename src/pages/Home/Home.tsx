import "assets/pages/Home/home.scss";
import "assets/input/searchfield.scss";

import SearchForm from "./SearchForm";
import Anime from "./Anime";
import Header from "components/header";
import { searchFormData } from "./SearchForm";
import { useState } from "react";
import ErrorPage from "pages/errorpage";

export default function Home() {
    let [form, setFormRequest] = useState<searchFormData | null>(null);
    const [error, setError] = useState<string | null>(null);

    if (error) {
        return <ErrorPage msg={error} />;
    }

    return (
        <div>
            <Header />
            <div className="home">
                <SearchForm updateForm={setFormRequest} />
                {form && <Anime form={form} setError={setError} />}
            </div>
        </div>
    );
}
