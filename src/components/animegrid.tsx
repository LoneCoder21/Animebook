import { Card, CardInfo } from "./Card";
import "assets/grid.scss";
import Spinner from "./loaders/spinner";
import Empty from "./empty";

export default function Animegrid({ loading, cards }: { loading: boolean; cards: CardInfo[] | null }) {
    return (
        <div className="grid_container">
            {loading && <Spinner />}
            {!loading &&
                cards?.map((item, index) => {
                    return <Card key={index} info={item} />;
                })}
            {!loading && cards?.length === 0 && <Empty />}
        </div>
    );
}
