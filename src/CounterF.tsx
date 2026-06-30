import React, { useState } from "react";

function Counter() {
  const [count, setCount] = useState(1);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
      <MyLargeComponent count={count}/>
    </div>
  );
}

function MyLargeComponent({ count }: { count: number }) {
    return (
        <div>
            <p>Count: {count}</p>
        </div>
    );
}



export default Counter;

const h = React.createElement

function Counter2() {
    const [count, setCount] = useState(1);
    return (h("div", null,
        h("p", null,
            "Count: ",
            count),
        h("button", { onClick: () => setCount(count + 1) }, "+"))
    );
}
