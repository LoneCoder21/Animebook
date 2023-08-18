import { useParams, useNavigate } from "react-router-dom";
import Header from "components/header";
import { useEffect, useState } from "react";
import LoadPage from "pages/Loading/loading";

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
        <div>
            <h3>{data.title}</h3>
            <img src={data.image} alt={data.title} />
        </div>
    );
}

function Synopsis({ data }: { data: ListingData }) {
    return (
        <div>
            <h4>Synopsis</h4>
            {data.synopsis ? data.synopsis : "No synopsis found"}
        </div>
    );
}

function Premiere({ data }: { data: ListingData }) {
    return (
        <div>
            <h3>{data.premiere && data.premiere?.season + " " + data.premiere?.year}</h3>
        </div>
    );
}

function Type({ data }: { data: ListingData }) {
    return (
        <div>
            <h3>{data.type}</h3>
        </div>
    );
}

function Rating({ data }: { data: ListingData }) {
    return (
        <div>
            <p>{data.rating}</p>
        </div>
    );
}

function Tags({ data }: { data: ListingData }) {
    return (
        <div>
            {data.genres.map((genre) => {
                return <p key={genre}>{genre}</p>;
            })}
        </div>
    );
}

function Score({ data }: { data: ListingData }) {
    return <div>{data.stats.score && "Score - " + data.stats.score}</div>;
}

function Rank({ data }: { data: ListingData }) {
    return <div>{data.stats.rank && "Rank - " + data.stats.rank}</div>;
}

function Popularity({ data }: { data: ListingData }) {
    return <div>{data.stats.popularity && "Popularity - " + data.stats.popularity}</div>;
}

function Info({ data }: { data: ListingData }) {
    return (
        <div>
            <p>{"Episodes - " + (data.episodes ? "Unknown" : data.episodes)}</p>
            <p>{"Duration - " + data.duration}</p>
            <p>{"Rating - " + data.rating}</p>

            <p>{"Status - " + data.airing.status}</p>
            <p>{"Airing - " + data.airing.airing}</p>
            <p>{"Air Date - " + data.airing.description}</p>
        </div>
    );
}

function Trailer({ data }: { data: ListingData }) {
    if (data.trailer == null) {
        return <></>;
    }
    return <iframe src={data.trailer?.embed} />;
}

function Listing({ data }: { data: ListingData }) {
    return (
        <div>
            <Header />
            <ListingCard data={data} />
            <Synopsis data={data} />
            <Premiere data={data} />
            <Type data={data} />
            <Rating data={data} />
            <Tags data={data} />
            <Score data={data} />
            <Rank data={data} />
            <Popularity data={data} />
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
