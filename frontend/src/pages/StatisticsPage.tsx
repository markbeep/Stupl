import React from "react";
import { Navbar } from "../components/Navbar";

type Props = {};

const StatisticsPage = (props: Props) => {
  return (
    <div>
      <Navbar></Navbar>
      <div>StatisticsPage</div>
      <div>
        <button className="mt-4 btn btn-primary flex w-full justify-center">
          Sign in
        </button>
      </div>
    </div>
  );
};

export default StatisticsPage;
