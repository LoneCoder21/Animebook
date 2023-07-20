import { useRouteError } from "react-router-dom";
import "./error.scss";
import Header from "components/header";
import { Link } from "../../../node_modules/react-router-dom/dist/index";

export default function ErrorPage() {
    const error = useRouteError();

    return (
        <div className="errorpage">
            <Header></Header>
            <section>
                <h1>Error!</h1>
                <h2>Sorry, an unexpected error has occurred.</h2>
                <h3>
                    <i>{error.statusText || error.message}</i>
                </h3>
                <Link to={`/`}>
                    <button>Back to home</button>
                </Link>
            </section>
        </div>
    );
}
