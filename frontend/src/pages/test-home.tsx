import React from "react";
import { Navbar } from "../components/Navbar";
import SampleCard from "../components/sample-card";

const TestHome = () => {
  return (
    <React.Fragment>
      <Navbar></Navbar>
      <div className="container mx-auto">
        <h1>Nothing much here</h1>
        <SampleCard />
        <button className="btn">Here</button>
      </div>
    </React.Fragment>
  );
};

export default TestHome;
