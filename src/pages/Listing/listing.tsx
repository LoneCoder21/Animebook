import "assets/pages/Listing/listing.scss";
import Header from "components/header";
import Spinner from "components/loaders/spinner";
import ErrorPage from "pages/errorpage";
import LoadPage from "pages/Loading/loading";
import { Dispatch, useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { BiSolidCameraMovie, BiSolidMusic } from "react-icons/bi";
import { BsDiscFill, BsFillSunFill, BsGlobe } from "react-icons/bs";
import { FaCanadianMapleLeaf, FaSnowflake } from "react-icons/fa";
import { PiFlowerFill, PiTelevisionSimpleFill } from "react-icons/pi";
import { useParams } from "react-router-dom";

// TODO - Clean up code in separate files
// TODO - Handle multi network calls with rate limit

export class ListingData {
    id: number;
    image: string;
    title: string;
    type: string;
    episodes?: number;
    duration: string;
    rating?: string;
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

class CharacterData {
    mal_id: number;
    name: string;
    image: string;
    role: string;

    constructor(json: any) {
        this.mal_id = json["character"]["mal_id"];
        this.name = json["character"]["name"];
        this.image = json["character"]["images"]["jpg"]["image_url"];
        this.role = json["role"];
    }

    static fromJson(json: any): CharacterData {
        return new CharacterData(json);
    }
}

function PremiereIcon({ season }: { season: string }) {
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

function TypeIcon({ type }: { type: string }) {
    let icon = <></>;

    switch (type) {
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
    return icon;
}

function ListingCard({ data }: { data: ListingData }) {
    return (
        <div className="display">
            <h3>{data.title}</h3>
            <img src={data.image} alt={data.title} />
            <Tags data={data} />
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

    return (
        <div className={"premiere " + data.premiere.season}>
            <PremiereIcon season={data.premiere.season} />
            <h3>{data.premiere.season}</h3>
            <h3>{data.premiere.year}</h3>
        </div>
    );
}

function Type({ data }: { data: ListingData }) {
    return (
        <div className="type">
            <TypeIcon type={data.type} />
            <h3>{data.type}</h3>
        </div>
    );
}

function Rating({ data }: { data: ListingData }) {
    return data.rating ? (
        <div className="rating">
            <p>{data.rating}</p>
        </div>
    ) : (
        <></>
    );
}

function Tags({ data }: { data: ListingData }) {
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

function Info({ data }: { data: ListingData }) {
    return (
        <div className="info">
            <Stats data={data} />
            <InfoAttribute type="Episodes" value={data.episodes ? data.episodes : "Unknown"} />
            <InfoAttribute type="Duration" value={data.duration} />
            <InfoAttribute type="Rating" value={data.rating} />

            <InfoAttribute type="Status" value={data.airing.status} />
            <InfoAttribute type="Aired" value={data.airing.description} />
        </div>
    );
}

//TODO - Fix iframe youtube when video fails to load. Ex. Country restriction, video removal, etc.

function Trailer({ data }: { data: ListingData }) {
    if (data.trailer == null) {
        return <></>;
    }
    return <iframe src={data.trailer.embed + "&autoplay=0"} title="Trailer" />;
}

function Character({ data }: { data: CharacterData }) {
    return (
        <div className="character">
            <img src={data.image} alt={data.name} />
            <h5>{data.name}</h5>
            <p>{data.role}</p>
        </div>
    );
}

function Characters({ data, setError }: { data: ListingData; setError: Dispatch<string> }) {
    const [characterdata, setCharacterData] = useState<CharacterData[] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://api.jikan.moe/v4/anime/${data.id}/characters`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                let new_cards: CharacterData[] = [];
                const cards_size = Object.keys(data["data"]).length;

                for (let i = 0; i < cards_size; ++i) {
                    new_cards.push(CharacterData.fromJson(data["data"][i]));
                }

                setLoading(false);
                setCharacterData(new_cards);
            })
            .catch((err) => {
                setError(err.toString());
            });
    }, [data.id]);

    if (characterdata?.length === 0) {
        return <></>;
    }

    return !loading && characterdata !== null ? (
        <div className="characters">
            <h4>Characters</h4>
            <div className="listings">
                {characterdata.map((character, index) => {
                    return <Character key={index} data={character} />;
                })}
            </div>
        </div>
    ) : (
        <Spinner />
    );
}

function Listing({ data, setError }: { data: ListingData; setError: Dispatch<string> }) {
    return (
        <div className="listing">
            <Header />
            <ListingCard data={data} />
            <Synopsis data={data} />
            <Premiere data={data} />
            <Type data={data} />
            <Rating data={data} />
            <Info data={data} />
            <Trailer data={data} />
            <Characters data={data} setError={setError} />
        </div>
    );
}

export default function ListingEntry() {
    const { id } = useParams();

    const [listingdata, setListingData] = useState<ListingData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id === undefined) return;
        fetch(`https://api.jikan.moe/v4/anime/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setLoading(false);
                setListingData(ListingData.fromJson(data["data"]));
            })
            .catch((err) => {
                setError(err.toString());
            });
    }, [id]);

    if (error) {
        return <ErrorPage msg={error} />;
    }

    return !loading && listingdata !== null ? <Listing data={listingdata} setError={setError} /> : <LoadPage />;
}
