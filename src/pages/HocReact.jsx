import { useEffect, useState } from "react";

export function Btn() {
    const [count, setCount] = useState(0);
    const [load, setLoad] = useState(false);

    useEffect(() => {
        alert("Hello side effect!");

        return () => alert("Goodbye component!");
    });

    // useEffect(() => {
    //     fetch("foo").then(() => setLoad(true));
    // }, []);

    return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
