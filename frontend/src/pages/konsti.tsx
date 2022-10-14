import { useState } from "react";

export const Konsti = () => {
  const [counter, setCounter] = useState(0);

  return <div>{counter} </div>;
};
