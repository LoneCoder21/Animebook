import { RotatingLines } from "react-loader-spinner";
import { Recommendation, RecommendationInfo } from "../pages/Home/Recommendations";
import { BiSad } from "react-icons/bi";
import "assets/grid.scss";

export default function Animegrid({ loading, cards }: { loading: boolean; cards: RecommendationInfo[] | null }) {
    return (
        <div className="grid_container">
            {loading && (
                <div className="spinner">
                    <RotatingLines
                        strokeColor="black"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="96"
                        visible={true}
                    />
                </div>
            )}
            {cards?.map((item) => {
                return <Recommendation key={item.mal_id} info={item} />;
            })}
            {cards?.length === 0 && (
                <div className="empty">
                    <BiSad size={50} className="icon" />
                    <p className="message">Nothing found!</p>
                </div>
            )}
        </div>
    );
}
