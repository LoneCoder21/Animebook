import { Fragment } from "react";

export default function RadioButtonHorizontal({
    type,
    className = "",
    options,
    checked,
    disabled = false,
    setChosenCallback
}: {
    type: string;
    className: string;
    options: string[];
    disabled?: boolean;
    checked: string;
    setChosenCallback: (value: string) => void;
}) {
    return (
        <fieldset className={className}>
            {options.map((item) => {
                return (
                    <Fragment key={item}>
                        <button
                            type="button"
                            className={(checked === item ? "selected" : "") + " " + (disabled ? "disabled" : "")}
                            onClick={() => {
                                if (!disabled) setChosenCallback(item);
                            }}
                        >
                            <input
                                type="radio"
                                id={`${type}-${item}`}
                                value={item}
                                name={type}
                                checked={checked === item}
                                disabled={disabled}
                                onChange={() => {}}
                            />
                            <label htmlFor={`${type}-${item}`}>{item}</label>
                        </button>
                    </Fragment>
                );
            })}
        </fieldset>
    );
}
