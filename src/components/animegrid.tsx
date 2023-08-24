import { AnimeCard, AnimeCardInfo } from "./Card";
import "assets/grid.scss";
import Spinner from "./loaders/spinner";
import Empty from "./empty";

export default function Animegrid({ loading, cards }: { loading: boolean; cards: AnimeCardInfo[] | null }) {
    let sorted_cards = structuredClone(cards) as typeof cards;
    sorted_cards?.sort(AnimeCardInfo.imageHeightComparator());

    return (
        <div className="grid_container">
            {loading && <Spinner />}
            {!loading &&
                sorted_cards?.map((item, index) => {
                    return <AnimeCard key={index} info={item} />;
                })}
            {!loading && sorted_cards?.length === 0 && <Empty />}
        </div>
    );
}
