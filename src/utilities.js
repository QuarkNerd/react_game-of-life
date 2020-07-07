import { useEffect, useRef } from "react";
// React doesnt work well with setInterval, see this link for more detais
//https://overreacted.io/making-setinterval-declarative-with-react-hooks/
const useInterval = (callback, delay) => {
    const savedCallback = useRef();

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

const formatInput = input => {
    const number = parseInt(input, 10);
    return isNaN(number) ? 0 : number;
}

export { useInterval, formatInput }