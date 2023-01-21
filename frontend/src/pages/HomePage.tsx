import { useRequest } from "ahooks";
import { group } from "console";
import React, { useContext, useEffect, useState } from "react";
import { getAllSubjects } from "../api/api";
import {
  categories,
  getCategoryWithId,
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
import { RequirementsCollapsible } from "../components/RequirementsCollapsible";
// import { SubjectGroup, subjectGroups, SubjectData } from "../data";

type DisplayOptions = {
  includePlanned: boolean;
  groupByCategory: boolean;
  requestRefresh: () => void;
  refreashId: number;
};
const DisplayOptionsContext = React.createContext<DisplayOptions>({
  includePlanned: false,
  groupByCategory: true,
  requestRefresh: () => {},
  refreashId: 0,
});

export const useDisplayOptions = () => useContext(DisplayOptionsContext);

const HomePage = () => {
  const [includePlanned, setIncludePlanned] = useState(false);
  const [groupByCategory, setGroupByCategory] = useState(true);
  const [refreashId, setRefreashId] = useState(0);

  const { token } = useAuth();

  const requestRefresh = () => {
    // window.location.reload();
    // getAllSubjectsRequest.refresh();
    setRefreashId(Math.floor(Math.random() * 100000000));
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
        requestRefresh,
        refreashId,
      }}
    >
      <Navbar></Navbar>
      <div className="pb-32 px-4">
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
                onChange={(e) => setIncludePlanned(e.target.checked)}
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
                onChange={(e) => setGroupByCategory(e.target.checked)}
              />
            </label>
          </div>
        </div>
        <div className="max-w-2xl mx-auto mt-12">
          <SubjectsDataDisplay></SubjectsDataDisplay>

          <div className="mt-4">
            <RequirementsCollapsible
              includePlanned={includePlanned}
            ></RequirementsCollapsible>
          </div>
        </div>
        <div className="container max-w-2xl mx-auto mt-8">
          <p className="float-right text-xs">All Data is without Guarantee.</p>
        </div>
      </div>
    </DisplayOptionsContext.Provider>
  );
};

//stackoverflow.com/questions/8539934/sort-an-array-of-objects-lexicographically-based-on-a-nested-value
function sortFactory(prop: string) {
  return function (a, b) {
    return a[prop].localeCompare(b[prop]);
  };
}

const groupSubjectsByCategory = (subjects: SubjectData[]) => {
  let ret: SubjectDataGroupedByCategory[] = [];
  const orderedSubs = subjects.sort((a, b) => a.semester - b.semester);
  for (const c of categories) ret.push({ category_id: c.id, subjects: [] });
  for (const s of orderedSubs)
    ret.find((group) => group.category_id === s.category_id)?.subjects.push(s);
  ret = ret.filter((group) => group.subjects.length > 0);
  return ret.sort(
    (a, b) =>
      getCategoryWithId(a.category_id)!.order -
      getCategoryWithId(a.category_id)!.order
  );
};

const groupSubjectsBySemester = (subjects: SubjectData[]) => {
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  let ret: SubjectDataGroupedBySemester[] = [];
  const allSems = subjects.map((s) => s.semester).filter(onlyUnique);

  const orderedSubs = subjects.sort(
    (a, b) =>
      getCategoryWithId(a.category_id)!.order -
      getCategoryWithId(b.category_id)!.order
  );

  for (const sem of allSems) ret.push({ semester: sem, subjects: [] });
  for (const s of orderedSubs)
    ret.find((group) => group.semester === s.semester)?.subjects.push(s);
  return ret
    .filter((group) => group.subjects.length > 0)
    .sort((a, b) => a.semester - b.semester);
};

const SubjectsDataDisplay = () => {
  const { groupByCategory, refreashId } = useDisplayOptions();

  const { token } = useAuth();
  const [prevData, setPrevData] = useState();

  const { data, error, loading, refresh } = useRequest(() =>
    getAllSubjects(token)
  );
  useEffect(() => {
    setPrevData(data);
    refresh();
  }, [refreashId]);

  const cachedData = data ?? prevData;
  const subjectData: SubjectData[] = cachedData?.map((s) => {
    if (s?.semester != null) {
      s.semester = parseInt(s.semester);
    }
    return s;
  });

  if (loading && !subjectData) return <div>Loading ...</div>;
  if (error) return <div>Error ...</div>;

  if (groupByCategory) {
    const subjectGroups = groupSubjectsByCategory(subjectData);
    return (
      <>
        <TotalAvgDisplay subjectGroups={subjectGroups}></TotalAvgDisplay>
        {subjectGroups.map((group) => (
          <div className="mt-4" key={group.category_id}>
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
          <div className="mt-4" key={group.semester}>
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
          <p className="mr-16">
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
