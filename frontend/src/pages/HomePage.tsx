import { useRequest } from "ahooks";
import { group } from "console";
import React, { useContext, useEffect, useState } from "react";
import { getAllSubjects } from "../api/api";
import {
  categories,
  SubjectData,
  SubjectDataGroupedByCategory,
  SubjectDataGroupedBySemester,
  SubjectDataGroupedGeneric,
} from "../api/schemas";
import { totalCredits, totalWsum } from "../api/subjectMath";
import { useAuth } from "../authHanlder";
// import { getAllSubjects } from "../api/hooks";
import Collapsible from "../components/Collapsible";
import { Navbar } from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import SubjectGroupCollapsible from "../components/SubjectGroupCollapsible";
import SemesterGroupCollapsible from "../components/SemesterGroupCollapsible";
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

let prevGetAllSubjectsRequest: any = null;
const HomePage = () => {
  const [includePlanned, setIncludePlanned] = useState(false);
  const [groupByCategory, setGroupByCategory] = useState(true);
  const { token } = useAuth();
  const [refreshListeners, setRefreshListeners] = useState<(() => void)[]>([]);

  const getAllSubjectsRequest = useRequest(() => getAllSubjects(token), {
    cacheKey: `request-1234`,
  });

  let allSubsRequest = getAllSubjectsRequest;

  if (
    allSubsRequest.loading &&
    prevGetAllSubjectsRequest &&
    prevGetAllSubjectsRequest.data != null
  )
    allSubsRequest = prevGetAllSubjectsRequest;

  prevGetAllSubjectsRequest = allSubsRequest;

  // useEffect(() => {
  //   getAllSubjects();
  // }, []);

  const getSubjets = async () => {
    const subs = await getAllSubjects(token);
  };

  const addRefreshListener = (cb: () => void) => {
    console.log("Adding refresh listener");
    setRefreshListeners([...refreshListeners, cb]);
  };

  const requestRefresh = () => {
    // window.location.reload();
    getAllSubjectsRequest.refresh();
    // console.log("requested refresh", refreshListeners.length);
    // for (const cb of refreshListeners) {
    //   console.log("callback called");
    // }
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
        <div className="mt-8 max-w-lg mx-auto">
          <SearchBar></SearchBar>
        </div>
        <div className="flex flex-col items-end max-w-lg mx-auto">
          <div className="form-control mt-4 w-64">
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
          <div className="form-control w-64 ">
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
        </div>
        <div className="max-w-2xl mx-auto mt-12">
          <SubjectsDataDisplay
            getAllSubjectsRequest={allSubsRequest}
          ></SubjectsDataDisplay>

          <div className="mt-12">
            <RequirementsCollapsible
              includePlanned={includePlanned}
            ></RequirementsCollapsible>
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

const groupSubjectsBySemester = (subjects: SubjectData[]) => {
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  const ret: SubjectDataGroupedBySemester[] = [];
  const allSems = subjects.map((s) => s.semester).filter(onlyUnique);

  for (const sem of allSems) ret.push({ semester: sem, subjects: [] });
  for (const s of subjects)
    ret.find((group) => group.semester === s.semester)?.subjects.push(s);
  return ret
    .filter((group) => group.subjects.length > 0)
    .sort((a, b) => a.semester - b.semester);
};

const SubjectsDataDisplay = ({
  getAllSubjectsRequest,
}: {
  getAllSubjectsRequest: any;
}) => {
  const { addRefreshListener } = useDisplayOptions();
  const { groupByCategory } = useDisplayOptions();

  if (getAllSubjectsRequest.loading) return <div>Loading ...</div>;
  if (getAllSubjectsRequest.error) return <div>Error ...</div>;

  const subjectData: SubjectData[] = getAllSubjectsRequest.data;

  if (groupByCategory) {
    const subjectGroups = groupSubjectsByCategory(subjectData);
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
  } else {
    const subjectGroups = groupSubjectsBySemester(subjectData);
    return (
      <>
        <TotalAvgDisplay subjectGroups={subjectGroups}></TotalAvgDisplay>
        {subjectGroups.map((group) => (
          <div className="mt-12">
            <SemesterGroupCollapsible
              subjectGroup={group}
            ></SemesterGroupCollapsible>
          </div>
        ))}
      </>
    );
  }
};

type TotalAvgDisplayProps = { subjectGroups: SubjectDataGroupedGeneric[] };

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
