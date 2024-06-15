import React, { useState, useEffect } from "react";


const Counter = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        console.log(`You clicked ${count} times~!`);
    }, [count]);

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
        </div>
    );
}

export default Counter;