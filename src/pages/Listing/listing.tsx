import { useParams, useNavigate } from "react-router-dom";
import Header from "components/header";
import { useEffect, useState } from "react";
import LoadPage from "pages/Loading/loading";

export type ListingData = {
    anime_id: number;
};

export function Listing({ data }: { data: ListingData }) {
    return (
        <div>
            <Header />
            {data.anime_id}
        </div>
    );
}

export default function ListingEntry() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [listingdata, setListingData] = useState<ListingData | null>(null);

    useEffect(() => {
        fetch(`https://api.jikan.moe/v4/anime/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                setLoading(false);
                setListingData({ anime_id: parseInt(id as string) });
            })
            .catch((error) => {
                navigate("/error", { replace: true });
            });
    }, [id, navigate]);

    return !loading && listingdata !== null ? <Listing data={listingdata} /> : <LoadPage />;
}
