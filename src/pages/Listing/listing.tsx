import { useParams, useNavigate } from "react-router-dom";
import Header from "components/header";
import { useEffect } from "react";

export default function Listing() {
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (typeof id === "undefined") {
            return;
        }
        if (!/^\d+$/.test(id)) {
            //check if id is a number
            navigate("/error", { replace: true });
        }
    }, [id, navigate]);

    return <Header />;
}
