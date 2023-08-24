import "assets/pages/Listing/listing.scss";
import Header from "components/header";
import ErrorPage from "pages/errorpage";
import LoadPage from "pages/Loading/loading";
import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import Characters from "./character";
import Info from "./info";
import { DisplayCard, Premiere, Rating, Synopsis, Type } from "./maininfo";
import Trailer from "./trailer";

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

function Listing({ data }: { data: ListingData }) {
    return (
        <div className="listing">
            <Header />
            <DisplayCard data={data} />
            <Synopsis data={data} />
            <Premiere data={data} />
            <Type data={data} />
            <Rating data={data} />
            <Info data={data} />
            <Trailer data={data} />
            <Characters data={data} />
        </div>
    );
}

export default function ListingEntry() {
    const { id } = useParams();

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [listingdata, setListingData] = useState<ListingData | null>(null);

    useEffect(() => {
        if (id === undefined) return;
        fetch(`https://api.jikan.moe/v4/anime/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`${response.status} - ${response.statusText}`);
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
    } else if (loading || !listingdata) {
        return <LoadPage />;
    } else {
        return <Listing data={listingdata} />;
    }
}
