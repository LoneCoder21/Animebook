import { useParams, useNavigate } from "react-router-dom";
import Header from "components/header";
import { useEffect, useState } from "react";
import LoadPage from "pages/Loading/loading";

export type ListingData = {
    id: number;
};

export function Listing({ data }: { data: ListingData }) {
    return (
        <div>
            <Header />
            {data.id}
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
                setListingData({ id: data["data"]["mal_id"] });
            })
            .catch((error) => {
                navigate("/error", { replace: true });
            });
    }, [id, navigate]);

    return !loading && listingdata !== null ? <Listing data={listingdata} /> : <LoadPage />;
}
