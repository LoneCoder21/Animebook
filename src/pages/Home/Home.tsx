import "assets/pages/Home/home.scss";
import Recommendations from "./Recommendations";
import Header from "components/header";

export default function Home() {
    return (
        <div>
            <Header />
            <Recommendations></Recommendations>
        </div>
    );
}
