import { PremiereIcon, TypeIcon } from "./icons";
import { ListingData } from "./listing";
import "assets/pages/Listing/maininfo.scss";

export function DisplayCard({ data }: { data: ListingData }) {
    return (
        <div className="display">
            <h2>{data.title}</h2>
            <img src={data.image} alt={data.title} />
            <Tags data={data} />
        </div>
    );
}

export function Synopsis({ data }: { data: ListingData }) {
    return (
        <div className="synopsis">
            <h1>Synopsis</h1>
            <p>{data.synopsis ? data.synopsis : "No synopsis found"}</p>
        </div>
    );
}

export function Premiere({ data }: { data: ListingData }) {
    if (!data.premiere) {
        return <></>;
    }

    return (
        <div className={"premiere " + data.premiere.season}>
            <PremiereIcon season={data.premiere.season} />
            <h3>{data.premiere.season}</h3>
            <h3>{data.premiere.year}</h3>
        </div>
    );
}

export function Type({ data }: { data: ListingData }) {
    return (
        <div className="type">
            <TypeIcon type={data.type} />
            <h3>{data.type}</h3>
        </div>
    );
}

export function Rating({ data }: { data: ListingData }) {
    return data.rating ? (
        <div className="rating">
            <p>{data.rating}</p>
        </div>
    ) : (
        <></>
    );
}

export function Tags({ data }: { data: ListingData }) {
    return (
        <div className="tags">
            {data.genres.map((genre) => {
                return <p key={genre}>{genre}</p>;
            })}
            {data.themes.map((theme) => {
                return <p key={theme}>{theme}</p>;
            })}
        </div>
    );
}
