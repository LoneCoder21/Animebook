import "assets/home.scss";
import Recommendations from "./Recommendations";
import Header from "components/header";

export default function Home() {
    return (
        <div>
            <Header></Header>
            <Recommendations></Recommendations>
        </div>
    );
}
