import { Dispatch, useEffect } from "react";

export default function useTimeout(time: number, state: boolean, setState: Dispatch<boolean>) {
    useEffect(() => {
        if (!state) return;
        const timer = setTimeout(() => {
            setState(!state);
        }, time);
        return () => clearTimeout(timer);
    }, [state, time, setState]);
}
