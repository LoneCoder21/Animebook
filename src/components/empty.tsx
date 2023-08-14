import { BiSad } from "react-icons/bi";
import "assets/empty.scss";

export default function Empty() {
    return (
        <div className="empty">
            <BiSad size={50} className="icon" />
            <p className="message">Nothing found!</p>
        </div>
    );
}
