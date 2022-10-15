import { group } from "console";
import { useState } from "react";
import Collapsible from "../components/Collapsible";
import { Navbar } from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import SemesterPill from "../components/SemesterPill";
import { SubjectGroup, subjectGroups, SubjectData } from "../data";
import { RequirementsCollapsible } from "./Yanick";

export const Konsti = () => {
  const [includePlanned, setIncludePlanned] = useState(false);
  return (
    <div className="pb-12">
      <Navbar></Navbar>

      <div className="mt-12 max-w-lg mx-auto">
        <SearchBar></SearchBar>
      </div>
      <div className="mt-12 max-w-lg mx-auto">
        <label className="label cursor-pointer">
          <span className="label-text">Include planned subjects.</span>
          <input type="checkbox" className="toggle toggle-accent" checked />
        </label>
      </div>
      <div className="max-w-2xl mx-auto mt-12">
        <div className="alert alert-">
          <div className="flex justify-between w-full">
            <h3 className="font-bold">Total</h3>
            <div className="flex">
              <p className="mr-8">
                {Number(
                  totalCredits({
                    includePlanned: includePlanned,
                    subjectGroups: subjectGroups,
                  })
                ) + "/180"}
              </p>
              <p className="mr-10">
                {/* compute the total average */}
                {(
                  Number(
                    totalWsum({
                      includePlanned: includePlanned,
                      subjectGroups: subjectGroups,
                    })
                  ) /
                  Number(
                    totalCredits({
                      includePlanned: includePlanned,
                      subjectGroups: subjectGroups,
                    })
                  )
                ).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
        {subjectGroups.map((group) => (
          <div className="mt-12">
            <SubjectGroupCollapsible
              subjectGroup={group}
              includePlanned={includePlanned}
            ></SubjectGroupCollapsible>
          </div>
        ))}
        <div className="mt-12">
          <RequirementsCollapsible></RequirementsCollapsible>
        </div>
      </div>
    </div>
  );
};

export default Konsti;

// function that checks if a certain subject should be included in calculations
const showSubject = ({
  includePlanned,
  subjectTableRowData,
}: {
  includePlanned: boolean;
  subjectTableRowData: SubjectData;
}) => {
  return includePlanned ? true : subjectTableRowData.planned ? false : true;
};

//compute sum of ECTS per category (that are to be included based on includePlanned)
const sumEcts = ({
  includePlanned,
  subjectGroup,
}: {
  includePlanned: boolean;
  subjectGroup: SubjectGroup;
}) => {
  return subjectGroup.data
    .reduce((accumulator, currentValue) => {
      return (
        accumulator +
        (showSubject({
          includePlanned: includePlanned,
          subjectTableRowData: currentValue,
        })
          ? currentValue.ects
          : 0)
      );
    }, 0)
    .toFixed(2);
};

//compute the weigthed sum of grades * ECTS per category
const wsumGrades = ({
  includePlanned,
  subjectGroup,
}: {
  includePlanned: boolean;
  subjectGroup: SubjectGroup;
}) => {
  console.log(subjectGroup.data);
  return subjectGroup.data.reduce((accumulator, currentValue) => {
    return (
      accumulator +
      (showSubject({
        includePlanned: includePlanned,
        subjectTableRowData: currentValue,
      })
        ? currentValue.grade * currentValue.ects
        : 0)
    );
  }, 0);
};

//compute the average grade based one includePlanned per category
const avgGrades = ({
  includePlanned,
  subjectGroup,
}: {
  includePlanned: boolean;
  subjectGroup: SubjectGroup;
}) => {
  console.log(
    Number(
      sumEcts({
        includePlanned: includePlanned,
        subjectGroup: subjectGroup,
      })
    )
  );
  if (
    Number(
      sumEcts({
        includePlanned: includePlanned,
        subjectGroup: subjectGroup,
      })
    ) === 0
  ) {
    return 0;
  } else {
    return (
      Number(
        wsumGrades({
          includePlanned: includePlanned,
          subjectGroup: subjectGroup,
        })
      ) /
      Number(
        sumEcts({
          includePlanned: includePlanned,
          subjectGroup: subjectGroup,
        })
      )
    ).toFixed(2);
  }
};

//compute total credits
const totalCredits = ({
  includePlanned,
  subjectGroups,
}: {
  includePlanned: boolean;
  subjectGroups: SubjectGroup[];
}) => {
  {
    return Number(
      subjectGroups.reduce((accumulator, currentValue) => {
        return (
          accumulator +
          Number(
            sumEcts({
              includePlanned: includePlanned,
              subjectGroup: currentValue,
            })
          )
        );
      }, 0)
    );
  }
};

//compute the total sum of weighted grades
const totalWsum = ({
  includePlanned,
  subjectGroups,
}: {
  includePlanned: boolean;
  subjectGroups: SubjectGroup[];
}) => {
  {
    return Number(
      subjectGroups.reduce((accumulator, currentValue) => {
        return (
          accumulator +
          Number(
            wsumGrades({
              includePlanned: includePlanned,
              subjectGroup: currentValue,
            })
          )
        );
      }, 0)
    );
  }
};

//Edit button
const DisplaySubjects = ({ subject }: { subject: SubjectData }) => {
  const [showEditButton, setShowEditButton] = useState(false);
  return (
    <tr
      onMouseEnter={() => setShowEditButton(true)}
      onMouseLeave={() => setShowEditButton(false)}
      key={subject.id}
    >
      <td className="text-left pr-2">{subject.name}</td>
      <td className="pr-2">
        <SemesterPill semester={subject.semester}></SemesterPill>
      </td>
      <td className="text-right pr-2">{subject.ects}</td>
      <td className="text-right pr-2">{subject.grade}</td>
      {/* was macht das hover hier*/}

      <td
        className={
          "transition-all " + (showEditButton ? " opacity-100" : " opacity-0")
        }
      >
        <button className="" onClick={() => console.log("Suck my nuts")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-edit"
          >
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
        </button>
      </td>
    </tr>
  );
};

const SubjectGroupCollapsible = ({
  subjectGroup,
  includePlanned,
}: {
  subjectGroup: SubjectGroup;
  includePlanned: boolean;
}) => {
  return (
    <Collapsible
      headerBuilder={(collapsed) => (
        <div className="flex justify-between">
          <div className="tooltip" data-tip={subjectGroup.information}>
            <h3>{subjectGroup.name}</h3>
          </div>
          <div className="flex">
            {collapsed && (
              <p className="mr-8">
                {Number(
                  sumEcts({
                    includePlanned: includePlanned,
                    subjectGroup: subjectGroup,
                  })
                )}
                /54
              </p>
            )}
            {collapsed && (
              <p className="mr-2">
                {" "}
                {Number(
                  avgGrades({
                    includePlanned: includePlanned,
                    subjectGroup: subjectGroup,
                  })
                )}
              </p>
            )}
          </div>
        </div>
      )}
    >
      <table className="table w-full">
        <thead className="rounded-none">
          <tr className="rounded-none">
            <th className="text-left z-index0-force"></th>
            <th className="pr-2">Semester</th>
            <th className="pr-2">ECTS</th>
            <th className="pr-2">Grade</th>
            <th className=""></th>
          </tr>
        </thead>
        <tbody>
          {subjectGroup.data.map((subject) => (
            <DisplaySubjects subject={subject}></DisplaySubjects>
          ))}
          <tr className="">
            <td className="text-left pr-2 bg-base-200">Total</td>
            <td className="bg-base-200 pr-2"></td>
            <td className="text-right bg-base-200 pr-2">
              {Number(
                sumEcts({
                  includePlanned: includePlanned,
                  subjectGroup: subjectGroup,
                })
              )}
              /54
            </td>
            {/* compute average grade per component */}
            <td className="text-right bg-base-200 pr-2">
              {Number(
                avgGrades({
                  includePlanned: includePlanned,
                  subjectGroup: subjectGroup,
                })
              )}
            </td>
            <td className="bg-base-200 "></td>
          </tr>
        </tbody>
      </table>
    </Collapsible>
  );
};
