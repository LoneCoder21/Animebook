import Spinner from "components/loaders/spinner";
import { Dispatch, useEffect, useState } from "react";
import { ListingData } from "./listing";
import "assets/pages/Listing/character.scss";

export class CharacterData {
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

function Character({ data }: { data: CharacterData }) {
    return (
        <div className="character">
            <img src={data.image} alt={data.name} />
            <h5>{data.name}</h5>
            <p>{data.role}</p>
        </div>
    );
}

export default function Characters({ data, setError }: { data: ListingData; setError: Dispatch<string> }) {
    const [characterdata, setCharacterData] = useState<CharacterData[] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://api.jikan.moe/v4/anime/${data.id}/characters`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`${response.status} - ${response.statusText}`);
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
    }, [data.id, setError]);

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
