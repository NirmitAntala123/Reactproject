import React from 'react';
import { useState, useEffect, useRef } from "react";
function Page2() {
  const [inputValue, setInputValue] = useState("");
  const previousInputValue = useRef("");
  const [time, setTime] = useState(1);  
  useEffect(() => {
    let timerId = setTimeout(() => {
      setTime((pre) => pre + 1);
    }, 2000);return () => clearTimeout(timerId);
  });
  useEffect(() => {
    previousInputValue.current = inputValue;
  }, [inputValue]);

  return (
    <>
    <div className='container-fluid'>
    {time}
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

