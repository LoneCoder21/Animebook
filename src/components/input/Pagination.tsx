import { Dispatch, useState } from "react";
import "assets/input/pagination.scss";

function PaginationNavigateButton({
    page,
    display,
    min,
    max,
    setPage
}: {
    page: number;
    display: string;
    min: number;
    max: number;
    setPage: Dispatch<number>;
}) {
    let isinrange = page >= min && page <= max;
    return (
        <button
            type="button"
            className={!isinrange ? "disabled " : ""}
            disabled={!isinrange}
            onClick={() => {
                setPage(page);
            }}
        >
            <p>{display}</p>
        </button>
    );
}

function PaginationNumberButton({
    page,
    display,
    min,
    max,
    selectedpage,
    setPage
}: {
    page: number;
    display: string;
    min: number;
    max: number;
    selectedpage: number | null;
    setPage: Dispatch<number>;
}) {
    let isinrange = page >= min && page <= max;
    return (
        <button
            type="button"
            className={!isinrange ? "disabled " : "" + (selectedpage === page ? "selected " : " ")}
            disabled={!isinrange}
            onClick={() => {
                setPage(page);
            }}
        >
            <p>{isinrange ? display : "."}</p>
        </button>
    );
}

export default function Pagination({
    width,
    max,
    page,
    setPage
}: {
    width: number;
    max: number;
    page: number;
    setPage: Dispatch<number>;
}) {
    const length = 2 * width + 1;
    console.log(width, max, page);
    if (max <= 1) {
        return <></>;
    }

    return (
        <div className="pagination">
            <PaginationNavigateButton page={Math.min(1, page - 1)} display={"«"} min={1} max={max} setPage={setPage} />
            <PaginationNavigateButton page={page - 1} display={"‹"} min={1} max={max} setPage={setPage} />
            {[...Array(length).keys()].map((index) => {
                const value = page - Math.floor(length / 2) + index;
                return (
                    <PaginationNumberButton
                        key={index}
                        page={value}
                        display={value.toString()}
                        min={1}
                        max={max}
                        selectedpage={page}
                        setPage={setPage}
                    />
                );
            })}
            <PaginationNavigateButton page={page + 1} display={"›"} min={1} max={max} setPage={setPage} />
            <PaginationNavigateButton
                page={Math.max(max, page + 1)}
                display={"»"}
                min={1}
                max={max}
                setPage={setPage}
            />
        </div>
    );
}
