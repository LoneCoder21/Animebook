import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import "assets/error.scss";
import Header from "components/header";
import { Link } from "react-router-dom";

function errorMessage(error: unknown): string {
    if (isRouteErrorResponse(error)) {
        return `${error.status} ${error.statusText}`;
    } else if (error instanceof Error) {
        return error.message;
    } else if (typeof error === "string") {
        return error;
    } else {
        console.error(error);
        return "Unknown error";
    }
}

export default function ErrorPage() {
    const message = errorMessage(useRouteError());

    return (
        <div className="errorpage">
            <Header></Header>
            <section>
                <h1>Error!</h1>
                <h2>Sorry, an unexpected error has occurred.</h2>
                <h3>
                    <i>{message}</i>
                </h3>
                <Link to={`/`}>
                    <button>Back to home</button>
                </Link>
            </section>
        </div>
    );
}
