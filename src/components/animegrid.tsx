import { AnimeCard, AnimeCardInfo } from "./Card";
import "assets/grid.scss";
import Spinner from "./loaders/spinner";
import Empty from "./empty";

export default function Animegrid({ loading, cards }: { loading: boolean; cards: AnimeCardInfo[] | null }) {
    return (
        <div className="grid_container">
            {loading && <Spinner />}
            {!loading &&
                cards?.map((item, index) => {
                    return <AnimeCard key={index} info={item} />;
                })}
            {!loading && cards?.length === 0 && <Empty />}
        </div>
    );
}
