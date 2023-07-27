import { useParams, useNavigate } from "react-router-dom";
import Header from "components/header";
import { useEffect } from "react";

export function Listing({ anime_id }: { anime_id: number }) {
    return (
        <div>
            <Header />
            {anime_id}
        </div>
    );
}

function isGoodParam(id: string | undefined) {
    return typeof id !== "undefined" && /^\d+$/.test(id);
}

export default function ListingEntry() {
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (typeof id === "undefined") {
            return;
        }
        if (!isGoodParam(id)) {
            //check if id is a number
            navigate("/error", { replace: true });
        }
    }, [id, navigate]);

    return isGoodParam(id) ? <Listing anime_id={parseInt(id as string)} /> : <Header></Header>;
}
