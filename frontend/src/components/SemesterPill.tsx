import React from "react";

type Props = { semester: number };

const SemesterPill = ({ semester }: Props) => {
  return <span className="badge">Sem {semester}</span>;
};

export default SemesterPill;
