import "assets/pages/Home/home.scss";
import "assets/input/searchfield.scss";

import SearchForm from "./SearchForm";
import Anime from "./Anime";
import Header from "components/header";
import { searchFormData } from "./SearchForm";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function Home() {
    let [form, setFormRequest] = useState<searchFormData | null>(null);
    const [error, setError] = useState<string | null>(null);
    let [maxpaginate, setMaxPaginate] = useState<number>(1);
    const navigate = useNavigate();

    if (error) {
        navigate("/error", { replace: true });
    }

    return (
        <div>
            <Header />
            <div className="home">
                <SearchForm updateForm={setFormRequest} maxpaginate={maxpaginate} />
                {form && <Anime form={form} setError={setError} setMaxPaginate={setMaxPaginate} />}
            </div>
        </div>
    );
}
