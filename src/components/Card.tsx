import "assets/card.scss";
import { useNavigate } from "react-router-dom";
export class CardInfo {
    mal_id: number;
    title: string;
    image: string;

    constructor(id: number, title: string, image: string) {
        this.mal_id = id;
        this.title = title;
        this.image = image;
    }

    static fromJson(json: any): CardInfo {
        return {
            mal_id: json["mal_id"],
            title: json["title"],
            image: json["images"]["jpg"]["image_url"]
        } as CardInfo;
    }
}

export function Card({ info }: { info: CardInfo }) {
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
