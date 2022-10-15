import { Button } from "@mui/material";
import * as React from "react";
import { Component } from "react";

interface CounterProps {}

interface CounterState {}

//standard component definition
const Counter = () => {
  //state: counter used variable
  // setCounter used to set Variable
  //(0) default value

  const decrease = () => {
    setCounter((count) => count - 1);
  };

  const increase = () => {
    setCounter((count) => count + 1);
  };

  const [counter, setCounter] = React.useState(0);
  return (
    <div>
      {/* onClick braucht Funktion die durch die Variable increase definiert ist */}
      <button className="btn" onClick={increase}>
        Plus
      </button>
      <button className="btn" onClick={decrease}>
        Minus
      </button>
      {/* {code} code in bewtween {} gets executed */}
      <p>{counter}</p>
      Hello Charäöööööööööl
    </div>
  );
};

export default Counter;

// type test = {x: number, y: number}
// const func = ({x, y}:test) => {
//     console.log("sdf")
// }

// const param:test = {x: 1, y: 2}
// func(param)
