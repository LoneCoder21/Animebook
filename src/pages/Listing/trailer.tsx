//TODO - Fix iframe youtube when video fails to load. Ex. Country restriction, video removal, etc.
import "assets/pages/Listing/trailer.scss";
import { ListingData } from "./listing";

export default function Trailer({ data }: { data: ListingData }) {
    if (data.trailer == null) {
        return <></>;
    }
    return (
        <div className="trailer">
            <iframe src={data.trailer.embed + "&autoplay=0&mute=1&rel=0"} title="Trailer" className="content" />
        </div>
    );
}
