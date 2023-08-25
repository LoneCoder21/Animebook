import { ListingData } from "./listing";
import "assets/pages/Listing/info.scss";

function Stat({ name, value }: { name: string; value: any }) {
    if (!value) {
        return <></>;
    }

    let style = { "--score": value / 10.0 } as React.CSSProperties;
    return (
        <div className={"stat " + name} style={style}>
            <h2 className="type">{name}</h2>
            <p className="value">{value}</p>
        </div>
    );
}

function Stats({ data }: { data: ListingData }) {
    return (
        <div className="stats">
            <Stat name="score" value={data.stats.score} />
            <Stat name="rank" value={data.stats.rank && "#" + data.stats.rank.toString()} />
            {false && <Stat name="popularity" value={data.stats.popularity} />}
        </div>
    );
}

function InfoAttribute({ type, value }: { type: string; value: any }) {
    if (!value) {
        return <></>;
    }
    return (
        <div className="attribute">
            <p className="type">{type + " -"}</p>
            <p className="value">{value}</p>
        </div>
    );
}

export default function Info({ data }: { data: ListingData }) {
    return (
        <div className="info">
            <Stats data={data} />
            <InfoAttribute type="Episodes" value={data.episodes ? data.episodes : "Unknown"} />
            <InfoAttribute type="Duration" value={data.duration} />

            <InfoAttribute type="Status" value={data.airing.status} />
            <InfoAttribute type="Aired" value={data.airing.description} />
        </div>
    );
}
