import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/index.scss";
import Home from "./pages/Home/Home";
import Popular from "./pages/Popular/popular";
import Random from "./pages/Random/random";
import Error from "./pages/errorpage";
import ListingEntry from "./pages/Listing/listing";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home></Home>,
        errorElement: <Error />
    },
    {
        path: "/error",
        element: <Error></Error>,
        errorElement: <Error />
    },
    {
        path: "/popular",
        element: <Popular></Popular>,
        errorElement: <Error />
    },
    {
        path: "/random",
        element: <Random></Random>,
        errorElement: <Error />
    },
    {
        path: "/listing/:id",
        element: <ListingEntry />
    }
]);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
