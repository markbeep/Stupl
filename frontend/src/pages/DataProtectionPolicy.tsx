import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";

type Props = {};

const DataProtectionPolicy = (props: Props) => {
  return (
    <>
      <div>
        <Navbar></Navbar>
      </div>
      <div className="container mx-auto max-w-lg mt-16">
        <h1 className="text-3xl font-bold">Data Protection Policy</h1>
        <p className="pt-8">
          Your data will be stored on a server. It will not be handed to third
          parties. It might be used for statistics, but in that case it will not
          be possible to reverse engineer grades to a specific account.
        </p>
      </div>
    </>
  );
};

export default DataProtectionPolicy;
