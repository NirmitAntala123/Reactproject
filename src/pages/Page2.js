import React from 'react';
import { useState, useEffect, useRef } from "react";
function Page2() {
  const [inputValue, setInputValue] = useState("");
  const previousInputValue = useRef("");

  useEffect(() => {
    previousInputValue.current = inputValue;
  }, [inputValue]);

  return (
    <>
    <div className='container-fluid'>
       <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <h4>Current Value: {inputValue}</h4>
      <h4>Previous Value: {previousInputValue.current}</h4>
    </div>
    </>
  );
}

export default Page2;