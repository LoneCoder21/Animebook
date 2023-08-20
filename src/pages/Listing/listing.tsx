import { useParams, useNavigate } from "react-router-dom";
import Header from "components/header";
import { useEffect, useState } from "react";
import LoadPage from "pages/Loading/loading";
import "assets/pages/Listing/listing.scss";
import { FaCanadianMapleLeaf, FaSnowflake } from "react-icons/fa";
import { BsDiscFill, BsFillSunFill, BsGlobe } from "react-icons/bs";
import { PiFlowerFill, PiTelevisionSimpleFill } from "react-icons/pi";
import { BiSolidCameraMovie, BiSolidMusic } from "react-icons/bi";
import { AiFillStar } from "react-icons/ai";

class PremiereData {
    season: string;
    year: number;
    constructor(season: string, year: number) {
        this.season = season;
        this.year = year;
    }
    getIcon(season: string) {
        let icon = <></>;
        switch (season) {
            case "spring":
                icon = <PiFlowerFill />;
                break;
            case "summer":
                icon = <BsFillSunFill />;
                break;
            case "fall":
                icon = <FaCanadianMapleLeaf />;
                break;
            case "winter":
                icon = <FaSnowflake />;
                break;
        }
        return icon;
    }
}

export class ListingData {
    id: number;
    image: string;
    title: string;
    type: string;
    episodes?: number;
    duration: string;
    rating: string;
    synopsis?: string;
    genres: string[];
    themes: string[];

    airing: {
        status: string;
        airing: boolean;
        description: string;
    };
    stats: {
        score?: number;
        rank?: number;
        popularity?: number;
    };
    trailer?: {
        embed: string;
        image: string;
    };
    premiere?: {
        season: string;
        year: number;
    };

    // constructs object using json data
    constructor(json: any) {
        this.id = json["mal_id"];
        this.image = json["images"]["jpg"]["image_url"];
        this.title = json["title"];
        this.type = json["type"];
        this.episodes = json["episodes"];
        this.duration = json["duration"];
        this.rating = json["rating"];
        this.synopsis = json["synopsis"];
        this.genres = json["genres"].map((genre: any) => genre["name"]);
        this.themes = json["themes"].map((theme: any) => theme["name"]);

        this.airing = {
            status: json["status"],
            airing: json["airing"],
            description: json["aired"]["string"]
        };

        this.stats = {
            score: json["score"],
            rank: json["rank"],
            popularity: json["popularity"]
        };

        if (json["trailer"]["embed_url"]) {
            this.trailer = {
                embed: json["trailer"]["embed_url"],
                image: json["trailer"]["images"]["maximum_image_url"]
            };
        }

        if (json["season"] && json["year"]) {
            this.premiere = {
                season: json["season"],
                year: json["year"]
            };
        }
    }

    static fromJson(json: any): ListingData {
        return new ListingData(json);
    }
}

function ListingCard({ data }: { data: ListingData }) {
    return (
        <div className="display">
            <h3>{data.title}</h3>
            <img src={data.image} alt={data.title} />
        </div>
    );
}

function Synopsis({ data }: { data: ListingData }) {
    return (
        <div className="synopsis">
            <h3>Synopsis</h3>
            <p>{data.synopsis ? data.synopsis : "No synopsis found"}</p>
        </div>
    );
}

function Premiere({ data }: { data: ListingData }) {
    if (!data.premiere) {
        return <></>;
    }

    let icon = <></>;
    switch (data.premiere.season) {
        case "spring":
            icon = <PiFlowerFill />;
            break;
        case "summer":
            icon = <BsFillSunFill />;
            break;
        case "fall":
            icon = <FaCanadianMapleLeaf />;
            break;
        case "winter":
            icon = <FaSnowflake />;
            break;
    }

    return (
        <div className={"premiere " + data.premiere.season}>
            {icon}
            <h3>{data.premiere.season}</h3>
            <h3>{data.premiere.year}</h3>
        </div>
    );
}

function Type({ data }: { data: ListingData }) {
    let icon = <></>;

    switch (data.type) {
        case "TV":
            icon = <PiTelevisionSimpleFill />;
            break;
        case "Movie":
            icon = <BiSolidCameraMovie />;
            break;
        case "OVA":
            icon = <BsDiscFill />;
            break;
        case "ONA":
            icon = <BsGlobe />;
            break;
        case "Special":
            icon = <AiFillStar />;
            break;
        case "Music":
            icon = <BiSolidMusic />;
            break;
    }

    return (
        <div className="type">
            {icon}
            <h3>{data.type}</h3>
        </div>
    );
}

function Rating({ data }: { data: ListingData }) {
    return (
        <div className="rating">
            <p>{data.rating}</p>
        </div>
    );
}

function Tags({ data }: { data: ListingData }) {
    return (
        <div className="tags">
            {data.genres.map((genre) => {
                return <p key={genre}>{genre}</p>;
            })}
        </div>
    );
}

function Stat({ name, value }: { name: string; value: any }) {
    if (!value) {
        return <></>;
    }
    let style = {};
    if (name === "score") {
        style = { "--score": value / 10.0 } as React.CSSProperties;
    }
    return (
        <div className={"stat " + name} style={style}>
            <h2 className="type">{name}</h2>
            <p className="value">{value}</p>
        </div>
    );
}

function Stats({ data }: { data: ListingData }) {
    console.log(data.stats.score);
    return (
        <div className="stats">
            <Stat name="score" value={data.stats.score} />
            <Stat name="rank" value={data.stats.rank && "#" + data.stats.rank.toString()} />
            {false && <Stat name="popularity" value={data.stats.popularity} />}
        </div>
    );
}

function InfoAttribute({ type, value }: { type: string; value: any }) {
    return (
        <div className="attribute">
            <p className="type">{type + " -"}</p>
            <p className="value">{value.toString()}</p>
        </div>
    );
}

function Info({ data }: { data: ListingData }) {
    console.log(data.airing.airing);
    return (
        <div className="info">
            <Stats data={data} />
            <InfoAttribute type="Episodes" value={data.episodes ? data.episodes : "Unknown"} />
            <InfoAttribute type="Duration" value={data.duration} />
            <InfoAttribute type="Rating" value={data.rating} />

            <InfoAttribute type="Status" value={data.airing.status} />
            <InfoAttribute type="Airing" value={data.airing.airing} />
            <InfoAttribute type="Air Date" value={data.airing.description} />
        </div>
    );
}

function Trailer({ data }: { data: ListingData }) {
    if (data.trailer == null) {
        return <></>;
    }
    return <iframe src={data.trailer?.embed + "&autoplay=0"} title="Trailer" />;
}

function Listing({ data }: { data: ListingData }) {
    return (
        <div className="listing">
            <Header />
            <ListingCard data={data} />
            <Synopsis data={data} />
            <Premiere data={data} />
            <Type data={data} />
            <Rating data={data} />
            <Tags data={data} />
            <Info data={data} />
            <Trailer data={data} />
        </div>
    );
}

export default function ListingEntry() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [listingdata, setListingData] = useState<ListingData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id === undefined) return;
        fetch(`https://api.jikan.moe/v4/anime/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setLoading(false);
                setListingData(ListingData.fromJson(data["data"]));
            })
            .catch((error) => {
                navigate("/error", { replace: true });
            });
    }, [id, navigate]);

    return !loading && listingdata !== null ? <Listing data={listingdata} /> : <LoadPage />;
}
