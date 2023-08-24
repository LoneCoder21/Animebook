import { Dispatch } from "react";
import "assets/input/pagination.scss";

function PaginationNavigateButton({
    page,
    display,
    disable,
    min,
    max,
    setPage
}: {
    page: number;
    display: string;
    disable: boolean;
    min: number;
    max: number;
    setPage: Dispatch<number>;
}) {
    const isinrange = page >= min && page <= max;
    const disabled = disable || !isinrange;

    return (
        <button
            type="button"
            className={disabled ? "disabled " : " "}
            disabled={disabled}
            onClick={() => {
                if (disabled) return;
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
    disable,
    min,
    max,
    selectedpage,
    setPage
}: {
    page: number;
    display: string;
    disable: boolean;
    min: number;
    max: number;
    selectedpage: number | null;
    setPage: Dispatch<number>;
}) {
    const isinrange = page >= min && page <= max;
    const disabled = disable || !isinrange;
    const selected = selectedpage === page;

    return (
        <button
            type="button"
            className={(disabled ? "disabled " : " ") + (selected ? "selected " : " ")}
            disabled={disabled}
            onClick={() => {
                if (disabled || selected) return;
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
    disabled,
    setPage
}: {
    width: number;
    max: number;
    page: number;
    disabled: boolean;
    setPage: Dispatch<number>;
}) {
    const length = 2 * width + 1;
    return (
        <div className="pagination">
            <PaginationNavigateButton
                page={Math.min(1, page - 1)}
                display={"«"}
                disable={disabled}
                min={1}
                max={max}
                setPage={setPage}
            />
            <PaginationNavigateButton
                page={page - 1}
                display={"‹"}
                disable={disabled}
                min={1}
                max={max}
                setPage={setPage}
            />
            {[...Array(length).keys()].map((index) => {
                const value = page - Math.floor(length / 2) + index;
                return (
                    <PaginationNumberButton
                        key={index}
                        page={value}
                        disable={disabled}
                        display={value.toString()}
                        min={1}
                        max={max}
                        selectedpage={page}
                        setPage={setPage}
                    />
                );
            })}
            <PaginationNavigateButton
                page={page + 1}
                display={"›"}
                disable={disabled}
                min={1}
                max={max}
                setPage={setPage}
            />
            <PaginationNavigateButton
                page={Math.max(max, page + 1)}
                display={"»"}
                disable={disabled}
                min={1}
                max={max}
                setPage={setPage}
            />
        </div>
    );
}
