import { useState } from "react";

export const Yanick = () => {
  const [counter, setCounter] = useState(0);

  return <div>{counter} </div>;
};
