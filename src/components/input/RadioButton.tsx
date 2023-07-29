import { Fragment } from "react";

// TODO - Fix defaultvalue bug

export default function RadioButtonHorizontal({
    type,
    className = "",
    options,
    checked,
    setChosenCallback
}: {
    type: string;
    className: string;
    options: string[];
    checked: string;
    setChosenCallback: (value: string) => void;
}) {
    return (
        <fieldset className={className}>
            {options.map((item) => {
                return (
                    <Fragment key={item}>
                        <button
                            className={checked === item ? "selected" : ""}
                            onClick={() => {
                                setChosenCallback(item);
                            }}
                        >
                            <input
                                type="radio"
                                id={`${type}-${item}`}
                                value={item}
                                name={type}
                                checked={checked === item}
                            />
                            <label htmlFor={`${type}-${item}`}>{item}</label>
                        </button>
                    </Fragment>
                );
            })}
        </fieldset>
    );
}
