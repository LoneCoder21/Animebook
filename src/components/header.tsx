import "assets/header.scss";
import { Link } from "react-router-dom";
import { BsGithub } from "react-icons/bs";
import { FaRandom } from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";
import { BsFillBookFill } from "react-icons/bs";

export function HeaderItem({
    to,
    name,
    children,
    newtab = false
}: {
    to: string;
    name: string;
    newtab?: boolean;
    children: JSX.Element;
}) {
    return (
        <Link className="link" to={to} target={newtab ? "_blank" : "_self"} rel="noopener noreferrer">
            {children}
            <span className={name}>{name}</span>
        </Link>
    );
}

export default function Header() {
    return (
        <header>
            <div className="left">
                <HeaderItem to="/" name="AnimeBook">
                    <BsFillBookFill className="icon" size={25} />
                </HeaderItem>
            </div>
            <div className="right">
                <HeaderItem to="/popular" name="Popular">
                    <AiFillHeart className="icon" size={25} />
                </HeaderItem>
                <HeaderItem to="/random" name="Random">
                    <FaRandom className="icon" size={25} />
                </HeaderItem>
                <HeaderItem to="https://github.com/LoneCoder21/Animebook" name="Github" newtab={true}>
                    <BsGithub className="icon" size={25} />
                </HeaderItem>
                <HeaderItem to="https://jikan.moe/" name="Jikan" newtab={true}>
                    <></>
                </HeaderItem>
            </div>
        </header>
    );
}
