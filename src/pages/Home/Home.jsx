import "assets/home.scss";
import Recommendations from "./recommendations";
import Header from "components/header";

export default function Home() {
    return (
        <div>
            <Header></Header>
            <Recommendations></Recommendations>
        </div>
    );
}
