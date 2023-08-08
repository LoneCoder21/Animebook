import "assets/header.scss";
import { Link } from "react-router-dom";
import { BsGithub } from "react-icons/bs";

export default function Header() {
    return (
        <header>
            <div className="left">
                <Link to={`/`}>Home</Link>
                <Link to={`/popular`}>Popular</Link>
                <Link to={`/random`}>Random</Link>
            </div>
            <div className="right">
                <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
                    <BsGithub className="icon" size={25} />
                </a>
            </div>
        </header>
    );
}
