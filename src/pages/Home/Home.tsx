import "assets/pages/Home/home.scss";
import "assets/input/searchfield.scss";
import Recommendations from "./Recommendations";
import SearchForm from "./SearchForm";
import Header from "components/header";

export default function Home() {
    return (
        <div>
            <Header />
            <input type="text" />
            <div className="home">
                <SearchForm />
                <Recommendations />
            </div>
        </div>
    );
}
