import "assets/pages/Home/home.scss";
import "assets/input/searchfield.scss";

import Recommendations from "./Recommendations";
import SearchForm from "./SearchForm";
import Anime from "./Anime";
import Header from "components/header";

export default function Home() {
    return (
        <div>
            <Header />
            <div className="home">
                <SearchForm />
                <Anime />
                <Recommendations />
            </div>
        </div>
    );
}
