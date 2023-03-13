import { createContext, useReducer } from "react";

export const TestingContext = createContext();

const initialState = {
  id: 1,
  name: "John1",
  age: 25,
  // add:""
};

const reducer1 = (state, action) => {
  switch (action.type) {
    case "add":
    //   let temp = Object.assign(state, action.payload);

    //   console.log(temp);
      return action.payload;

    case "update":
      // console.log(action.payload,'action.payload');
      // console.log(state,'reducer1');

      // console.log(temp1);
      return Object.assign(state, action.payload);
    case "delete":
      let new1 = {
          name:action.payload
      }
    // console.log(state,'reducer1');
    //   return state=new1;
  }
};

export const TestingProvider = (props) => {
  const [state, dispatch] = useReducer(reducer1, initialState);

  return (
    <TestingContext.Provider value={[state, dispatch]}>
      {props.children}
    </TestingContext.Provider>
  );
};
