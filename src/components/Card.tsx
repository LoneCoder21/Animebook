import "assets/card.scss";
import { useNavigate } from "react-router-dom";

export class CardInfo {
    title: string;
    image: string;

    constructor(title: string, image: string) {
        this.title = title;
        this.image = image;
    }

    static fromJson(json: any): CardInfo {
        return {
            title: json["title"],
            image: json["images"]["jpg"]["image_url"]
        } as CardInfo;
    }
}
export class AnimeCardInfo extends CardInfo {
    mal_id: number;

    constructor(id: number, title: string, image: string) {
        super(title, image);
        this.mal_id = id;
    }

    static fromJson(json: any): AnimeCardInfo {
        return {
            mal_id: json["mal_id"],
            title: json["title"],
            image: json["images"]["jpg"]["image_url"]
        } as AnimeCardInfo;
    }
}

export function Card({ info }: { info: CardInfo }) {
    return (
        <div className="card">
            <img src={info.image} alt={info.title}></img>
            <p>{info.title}</p>
        </div>
    );
}

export function AnimeCard({ info }: { info: AnimeCardInfo }) {
    const navigate = useNavigate();

    return (
        <div
            className="card"
            onClick={() => {
                navigate(`/listing/${info.mal_id}`, { replace: false });
            }}
        >
            <img src={info.image} alt={info.title}></img>
            <p>{info.title}</p>
        </div>
    );
}
