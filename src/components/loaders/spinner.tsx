import { RotatingLines } from "react-loader-spinner";
import "assets/spinner.scss";

export default function Spinner() {
    return (
        <div className="spinner">
            <RotatingLines strokeColor="black" strokeWidth="5" animationDuration="0.75" width="96" visible={true} />
        </div>
    );
}
