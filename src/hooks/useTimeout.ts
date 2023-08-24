import { Dispatch, useEffect } from "react";

export default function useTimeout(time: number, state: boolean, setState: Dispatch<boolean>) {
    useEffect(() => {
        if (!state) return;
        // wait for a second to load characters. important for rate limit restriction
        const timer = setTimeout(() => {
            setState(!state);
        }, time);
        return () => clearTimeout(timer);
    }, [state]);
}
