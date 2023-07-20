import "assets/header.scss";
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header>
            <Link to={`/`}>Home</Link>
            <Link to={`/popular`}>Popular</Link>
            <Link to={`/random`}>Random</Link>
        </header>
    );
}
