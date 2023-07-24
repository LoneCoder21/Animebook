import { useRouteError } from "react-router-dom";
import "../../assets/error.scss";
import Header from "../../components/header";
import { Link } from "react-router-dom";

export default function ErrorPage() {
    // const error = useRouteError();

    return (
        <div className="errorpage">
            <Header></Header>
            <section>
                <h1>Error!</h1>
                <h2>Sorry, an unexpected error has occurred.</h2>
                <h3>{/* <i>{error.statusText || error.message}</i> */}</h3>
                <Link to={`/`}>
                    <button>Back to home</button>
                </Link>
            </section>
        </div>
    );
}
