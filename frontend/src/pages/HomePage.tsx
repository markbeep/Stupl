import { group } from "console";
import React, { useContext, useEffect, useState } from "react";
import { getAllSubjects } from "../api/api";
import { totalCredits, totalWsum } from "../api/subjectMath";
import { useAuth } from "../authHanlder";
// import { getAllSubjects } from "../api/hooks";
import Collapsible from "../components/Collapsible";
import { Navbar } from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import SemesterPill from "../components/SemesterPill";
import SubjectGroupCollapsible from "../components/SubjectGroupCollapsible";
import { SubjectGroup, subjectGroups, SubjectData } from "../data";
import { RequirementsCollapsible } from "./Yanick";

type DisplayOptions = {
  includePlanned: boolean;
  groupByCategory: boolean;
};
const DisplayOptionsContext = React.createContext<DisplayOptions>({
  includePlanned: false,
  groupByCategory: true,
});

export const useDisplayOptions = () => useContext(DisplayOptionsContext);

const HomePage = () => {
  const [includePlanned, setIncludePlanned] = useState(false);
  const [groupByCategory, setGroupByCategory] = useState(true);
  const { token } = useAuth();
  // useEffect(() => {
  //   getAllSubjects();
  // }, []);

  const getSubjets = async () => {
    const subs = await getAllSubjects(token);
    console.log(subs);
  };

  return (
    <DisplayOptionsContext.Provider
      value={{
        includePlanned,
        groupByCategory,
      }}
    >
      <div className="pb-12">
        <Navbar></Navbar>
        <button
          className="btn btn-primary"
          onClick={() => getAllSubjects(token).then(console.log)}
        >
          Click me
        </button>
        <div className="mt-12 max-w-lg mx-auto">
          <SearchBar></SearchBar>
        </div>
        <div className="form-contorl mt-12 max-w-lg mx-auto">
          <label className="label cursor-pointer">
            <span className="label-text">Include planned subjects.</span>
            <input
              type="checkbox"
              className="toggle toggle-accent"
              checked={includePlanned}
              onClick={() => setIncludePlanned(!includePlanned)}
            />
          </label>
        </div>
        <div className="form-contorl mt-12 max-w-lg mx-auto">
          <label className="label cursor-pointer">
            <span className="label-text">Group by Category</span>
            <input
              type="checkbox"
              className="toggle toggle-accent"
              checked={groupByCategory}
              onClick={() => setGroupByCategory(!groupByCategory)}
            />
          </label>
        </div>
        <div className="max-w-2xl mx-auto mt-12">
          <TotalAvgDisplay></TotalAvgDisplay>
          {subjectGroups.map((group) => (
            <div className="mt-12">
              <SubjectGroupCollapsible
                subjectGroup={group}
              ></SubjectGroupCollapsible>
            </div>
          ))}
          <div className="mt-12">
            <RequirementsCollapsible></RequirementsCollapsible>
          </div>
        </div>
      </div>
    </DisplayOptionsContext.Provider>
  );
};

const TotalAvgDisplay = () => {
  const { includePlanned } = useDisplayOptions();
  return (
    <div className="alert">
      <div className="flex justify-between w-full">
        <h3 className="font-bold">Total</h3>
        <div className="flex">
          <p className="mr-8">
            {totalCredits(includePlanned, subjectGroups) + "/180"}
          </p>
          <p className="mr-10">
            {/* compute the total average */}
            {(
              totalWsum(includePlanned, subjectGroups) /
              totalCredits(includePlanned, subjectGroups)
            ).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
