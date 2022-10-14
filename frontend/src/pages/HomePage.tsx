import React, { useState } from "react";
import Collapsible from "../components/Collapsible";
import { SubjectGroup, subjectGroups, subjectTableRowData } from "../data";

const HomePage = () => {
  return (
    <div className="container max-w-xl mx-auto mt-32">
      {subjectGroups.map((group) => (
        <div className="mt-12">
          <SubjectGroupCollapsible
            subjectGroup={group}
          ></SubjectGroupCollapsible>
        </div>
      ))}
    </div>
  );
};

export default HomePage;

const SubjectGroupCollapsible = ({
  subjectGroup,
}: {
  subjectGroup: SubjectGroup;
}) => {
  return (
    <Collapsible
      headerBuilder={(collapsed) => (
        <div className="flex justify-between">
          <h3>{subjectGroup.name}</h3>
          <div className="flex">
            {collapsed && <p className="mr-8">37/54</p>}
            {collapsed && <p className="mr-4">5.37</p>}
          </div>
        </div>
      )}
    >
      <table className="table w-full">
        <thead className="rounded-none">
          <tr className="rounded-none">
            <th className="text-left"></th>
            <th className="pr-2">Semester</th>
            <th className="pr-2">ECTS</th>
            <th className="pr-2">Grade</th>
            <th className=""></th>
          </tr>
        </thead>
        <tbody>
          {subjectGroup.data.map((subject) => (
            <tr key={subject.id}>
              <td className="text-left pr-2">{subject.name}</td>
              <td className="pr-2">Sem {subject.semester}</td>
              <td className="pr-2">{subject.ects}</td>
              <td className="pr-2">{subject.grade}</td>
              <td className=""></td>
            </tr>
          ))}
          <tr className="">
            <td className="text-left pr-2 bg-base-200">Total</td>
            <td className="bg-base-200 pr-2"></td>
            <td className="bg-base-200 pr-2">36/54</td>
            <td className="bg-base-200 pr-2">5.37</td>
            <td className="bg-base-200 "></td>
          </tr>
        </tbody>
      </table>
    </Collapsible>
  );
};
