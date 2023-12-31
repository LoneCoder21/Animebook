import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import "assets/pages/Error/error.scss";
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
        return "Unknown error";
    }
}

export default function ErrorPage({ msg }: { msg?: string }) {
    let message = errorMessage(useRouteError());
    if (msg) {
        message = msg;
    }

    return (
        <div className="errorpage">
            <Header />
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
