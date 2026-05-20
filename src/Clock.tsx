import { useEffect } from "react";
import { useAppState } from "./useAppstate";

export function Clock() {
    //"use no memo";
    const time = useAppState((state) => state.time);
    const updateTime = useAppState((state) => state.updateTime);

    const tick = () => {
        console.log("tick");
        updateTime();
    }

    useEffect(() => {
        console.log("Clock effect");
        const interval = setInterval(() => {
            tick();
        }, 1_000);
        return () => clearInterval(interval);
    }, [tick]);

    return (
        <div>
            <div>{time.toLocaleTimeString()}</div>
        </div>
    );
}