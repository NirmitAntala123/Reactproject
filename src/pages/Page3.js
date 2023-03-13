import React, { useReducer } from 'react';
import { useState } from "react";
import { useImmerReducer } from "use-immer";
const initialState = { count: 0 }; 


function reducer(state, action) {
  switch (action.type) {
    case "reset":
      return initialState;
    case "increment":
      return {
        count: state.count + 1
      };
    case "decrement":
      return {
        count: state.count - 1
      };
  }
}

const Page3 = () =>  {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [inputValue, setInputValue] = useState("");
  const [todos, setValue] = useState([]);
  const [product, updateProduct] = useState({
    name: "Product 1",
    SKU: "SKU-001",
    availability: 30,
    stock: [
      {
        id: 1, 
        store: "Store 1",
        quantity: 10
      },
      {
        id: 2, 
        store: "Store 2",
        quantity: 20
      }
    ]
  });
  const addvalue = () => {
    setValue(inputValue);
    updateProduct({ ...product, name: "Product 1 - Updated with state" })
  //   updateProduct((draft) => {
  //     draft.stock[1].quantity = 30;
  // })
  };
  return (
    <>
    <div className='container'>
       <input
        type="text"
        id="message"
        // value={inputValue}
        onChange={(e) => setInputValue(e.target.value)} 
      />
     <button onClick={addvalue}>+</button>
     <h6>{inputValue}</h6>
     <h6>{todos}</h6>

     Count: {state.count}
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
    </div>
    </>
  );
}

export default Page3;