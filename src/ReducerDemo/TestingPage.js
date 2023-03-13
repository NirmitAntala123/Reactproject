import React, { useContext, useEffect, useState } from "react";
import { TestingContext } from "../Context/TestingContext";

const TestingPage = () => {
  const [state, dispatch] = useContext(TestingContext);
  console.log(state, "TestingPage");
  const [statedata, setstatedata] = useState({});
  // console.log(statedata);
  // useEffect(() => {

  //   console.log("update data");
  //   // setstatedata(state);
  // }, [statedata]);
  return (
    <div>{console.log('componat rerender')}
      {/* {dispatch({
      'type':"delete",
      'payload': null
    })} */}
      <button
        onClick={() => {
          dispatch({
            type: "add",
            payload: {
              id:10,
              name: "John4",
              age: 26,
            },
          });
        }}
      >
        add
      </button>
      <button
        onClick={() => {
          dispatch({
            type: "update",
            payload: {
              id: 2,
              name: "John2",
              age: 26,
            },
          });

          // setstatedata({
          //   id: 3,
          //   name: "John2",
          //   age: 26,
          // });
        }}
      >
        update
      </button>
      {/* {dispatch({
            type: "delete",
            payload:null
          })} */}

      {JSON.stringify(state)}
    </div>
  );
};

export default TestingPage;
