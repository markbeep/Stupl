import React from "react";

type Props = { semester: number };

const colors = ["#ffbe0b", "#fb5607", "#ff006e", "#8338ec", "#3a86ff"];

const SemesterPill = ({ semester }: Props) => {
  return (
    <div className="flex items-center">
      {semester}{" "}
      <div
        className="rounded w-2 h-2 ml-2"
        style={{ background: colors[semester % colors.length] }}
      ></div>{" "}
    </div>
  );
};

export default SemesterPill;
