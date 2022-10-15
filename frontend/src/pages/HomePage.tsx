import { useRequest } from "ahooks";
import { group } from "console";
import React, { useContext, useEffect, useState } from "react";
import { getAllSubjects } from "../api/api";
import {
  categories,
  SubjectData,
  SubjectDataGroupedByCategory,
} from "../api/schemas";
import { totalCredits, totalWsum } from "../api/subjectMath";
import { useAuth } from "../authHanlder";
// import { getAllSubjects } from "../api/hooks";
import Collapsible from "../components/Collapsible";
import { Navbar } from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import SubjectGroupCollapsible from "../components/SubjectGroupCollapsible";
// import { SubjectGroup, subjectGroups, SubjectData } from "../data";
import { RequirementsCollapsible } from "./Yanick";

type DisplayOptions = {
  includePlanned: boolean;
  groupByCategory: boolean;
  addRefreshListener: (callback: () => void) => void;
  requestRefresh: () => void;
};
const DisplayOptionsContext = React.createContext<DisplayOptions>({
  includePlanned: false,
  groupByCategory: true,
  addRefreshListener: (_) => {},
  requestRefresh: () => {},
});

export const useDisplayOptions = () => useContext(DisplayOptionsContext);

const HomePage = () => {
  const [includePlanned, setIncludePlanned] = useState(false);
  const [groupByCategory, setGroupByCategory] = useState(true);
  const { token } = useAuth();
  const [refreshListeners, setRefreshListeners] = useState<(() => void)[]>([]);
  // useEffect(() => {
  //   getAllSubjects();
  // }, []);

  const getSubjets = async () => {
    const subs = await getAllSubjects(token);
    console.log("Subjects", subs);
  };

  const addRefreshListener = (cb: () => void) => {
    setRefreshListeners([...refreshListeners, cb]);
  };

  const requestRefresh = () => {
    for (const cb of refreshListeners) cb();
  };

  return (
    <DisplayOptionsContext.Provider
      value={{
        includePlanned,
        groupByCategory,
        addRefreshListener,
        requestRefresh,
      }}
    >
      <div className="pb-12">
        <Navbar></Navbar>
        <button className="btn btn-primary" onClick={() => getSubjets()}>
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
          <SubjectsDataDisplay></SubjectsDataDisplay>

          <div className="mt-12">
            <RequirementsCollapsible></RequirementsCollapsible>
          </div>
        </div>
      </div>
    </DisplayOptionsContext.Provider>
  );
};

const groupSubjectsByCategory = (subjects: SubjectData[]) => {
  const ret: SubjectDataGroupedByCategory[] = [];
  for (const c of categories) ret.push({ category_id: c.id, subjects: [] });
  for (const s of subjects)
    ret.find((group) => group.category_id === s.category_id)?.subjects.push(s);
  return ret.filter((group) => group.subjects.length > 0);
};

const SubjectsDataDisplay = () => {
  const { addRefreshListener } = useDisplayOptions();

  const { token } = useAuth();
  const { data, error, loading, refresh } = useRequest(() =>
    getAllSubjects(token)
  );
  useEffect(() => {
    addRefreshListener(() => refresh());
  }, []);

  if (loading) return <div>Loading ...</div>;
  if (error) return <div>Error ...</div>;

  const subjectData: SubjectData[] = data;
  console.log("subjectData: ", subjectData);
  const subjectGroups = groupSubjectsByCategory(subjectData);
  console.log(subjectGroups);

  return (
    <>
      <TotalAvgDisplay subjectGroups={subjectGroups}></TotalAvgDisplay>
      {subjectGroups.map((group) => (
        <div className="mt-12">
          <SubjectGroupCollapsible
            subjectGroup={group}
          ></SubjectGroupCollapsible>
        </div>
      ))}
    </>
  );
};

type TotalAvgDisplayProps = { subjectGroups: SubjectDataGroupedByCategory[] };

const TotalAvgDisplay = ({ subjectGroups }: TotalAvgDisplayProps) => {
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
