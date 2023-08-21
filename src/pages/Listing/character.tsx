import Spinner from "components/loaders/spinner";
import { useEffect, useState } from "react";
import { ListingData } from "./listing";
import "assets/pages/Listing/character.scss";

export class CharacterData {
    mal_id: number;
    name: string;
    image?: string;
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

export default function Characters({ data }: { data: ListingData }) {
    const [characterdata, setCharacterData] = useState<CharacterData[] | null>(null);
    const [wait, setWait] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (wait) {
            //wait for a second to load characters. important for rate limit restriction
            const timer = setTimeout(() => {
                setWait(false);
            }, 1000);
            return () => clearTimeout(timer);
        } else {
            //after wait we fetch the characters and display it
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
                        let character = CharacterData.fromJson(data["data"][i]);
                        if (character.image) {
                            new_cards.push(character);
                        } // ignore null images characters
                    }

                    setLoading(false);
                    setCharacterData(new_cards);
                })
                .catch((err) => {
                    setCharacterData([]); //don't display characters when an error happens
                });
        }
    }, [wait, data.id]);

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
