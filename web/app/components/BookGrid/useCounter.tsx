import { useState } from "react";

export const useCounter = () => {
        const [counter, setCounter] = useState(1);

        const handleIncrement = () => {
                setCounter(counter + 1);
        };

        const handleDecrement = () => {
                if (counter == 1) {
                        return;
                }

                setCounter(counter - 1);
        };

        const restartCounter = () => {
                setCounter(1);
        };

        return { counter, handleIncrement, handleDecrement, restartCounter };
};
