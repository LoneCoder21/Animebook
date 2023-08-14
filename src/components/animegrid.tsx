import { Card, CardInfo } from "./Card";
import { BiSad } from "react-icons/bi";
import "assets/grid.scss";
import Spinner from "./loaders/spinner";

export default function Animegrid({ loading, cards }: { loading: boolean; cards: CardInfo[] | null }) {
    return (
        <div className="grid_container">
            {loading && <Spinner />}
            {!loading &&
                cards?.map((item) => {
                    return <Card key={item.mal_id} info={item} />;
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
