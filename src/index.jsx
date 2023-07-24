import React from "react";
import ReactDOM from "react-dom/client";
import "assets/index.scss";
import Home from "./pages/Home/Home";
import Popular from "./pages/Popular/popular";
import Random from "./pages/Random/random";
import ErrorPage from "./pages/Error/errorpage";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home></Home>,
        errorElement: <ErrorPage />
    },
    {
        path: "/popular",
        element: <Popular></Popular>,
        errorElement: <ErrorPage />
    },
    {
        path: "/random",
        element: <Random></Random>,
        errorElement: <ErrorPage />
    }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
