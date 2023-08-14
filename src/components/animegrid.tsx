import { Recommendation, RecommendationInfo } from "../pages/Home/Recommendations";
import { BiSad } from "react-icons/bi";
import "assets/grid.scss";
import Spinner from "./loaders/spinner";

export default function Animegrid({ loading, cards }: { loading: boolean; cards: RecommendationInfo[] | null }) {
    return (
        <div className="grid_container">
            {loading && <Spinner />}
            {!loading &&
                cards?.map((item) => {
                    return <Recommendation key={item.mal_id} info={item} />;
                })}
            {!loading && cards?.length === 0 && (
                <div className="empty">
                    <BiSad size={50} className="icon" />
                    <p className="message">Nothing found!</p>
                </div>
            )}
        </div>
    );
}
