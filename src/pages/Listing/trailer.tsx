//TODO - Fix iframe youtube when video fails to load. Ex. Country restriction, video removal, etc.

import { ListingData } from "./listing";

export default function Trailer({ data }: { data: ListingData }) {
    if (data.trailer == null) {
        return <></>;
    }
    return <iframe src={data.trailer.embed + "&autoplay=0&mute=1"} title="Trailer" />;
}
