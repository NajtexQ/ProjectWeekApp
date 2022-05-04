import React, { useEffect, useRef } from "react";

export default function useOuterClick(callback:any) {
    const callbackRef = useRef<any>();
    const innerRef = useRef<any>();

    useEffect(() => { callbackRef.current = callback; });

    useEffect(() => {
        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
        function handleClick(e:any) {
            if (innerRef.current && callbackRef.current &&
                !innerRef.current.contains(e.target)
            ) callbackRef.current(e);
        }
    }, []);

    return innerRef;
}