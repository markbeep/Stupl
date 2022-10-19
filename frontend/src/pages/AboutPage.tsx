import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";

type Props = {};

const AboutPage = (props: Props) => {
  return (
    <>
      <div>
        <Navbar></Navbar>
      </div>
      <div className="container mx-auto max-w-lg mt-16">
        {/* <img className="mx-auto h-25 w-auto" src={logo} /> */}
        {/* <img
            src="https://placeimg.com/260/400/arch"
            className="max-w-sm rounded-lg shadow-2xl"
          /> */}
        <h1 className="text-3xl font-bold">I plan it that way!</h1>
        <p className="pt-8">
          Get to know our webapplication "Stupl" that enables every D-INFK
          Bachelor student to plan her/his studies. The DINFK Bachelor
          regulations are one above all: complicated! Loosing overview over what
          is done and what needs to be done to get you Bachlor in time happens
          very easily. To prevent that from happening "Plan your studies"
          provides a simple way to plan everything and make sure that the plan
          satisifies all requirements.
        </p>
        <p className="pt-4">
          This application was developed by the Bibstreet Boys during VIScon
          2022. In the 42 hours we developed the design & implemented everything
          from scratch. The Bibstreet Boys are Charles Kremer, Mark Csurgay,
          Konstantin Sturm, Leander Diaz Bone, and Yanick Schimpf.
        </p>
        <p className="pt-4">We hope that you enjoy our application.</p>
        <div className="flex justify-center mt-8">
          <Link to="/home" className="mt-6 btn btn-primary px-16">
            Get Started
          </Link>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
