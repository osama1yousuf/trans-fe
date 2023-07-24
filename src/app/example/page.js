'use client';
import React, { useState } from 'react';

function MyComponent() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <>
    <div>
      <h1>Count: {count}</h1>
      <button onClick={handleClick}>Click me</button>
    </div>
      <dashboard />
    </>
  );
}

export default MyComponent;