import { useState } from "react";
import {
  getCategoryWithId,
  SubjectData,
  SubjectDataGroupedByCategory,
} from "../api/schemas";
import { avgGrades, sumEcts } from "../api/subjectMath";
import { useDisplayOptions } from "../pages/HomePage";
import Collapsible from "./Collapsible";
import EditSubjectModal from "./EditSubjectModal";
import SemesterPill from "./SemesterPill";

const SubjectGroupCollapsible = ({
  subjectGroup,
}: {
  subjectGroup: SubjectDataGroupedByCategory;
}) => {
  const { includePlanned } = useDisplayOptions();
  return (
    <Collapsible
      headerBuilder={(collapsed) => (
        <div className="flex justify-between select-none w-full">
          <div
            className="tooltip"
            data-tip={getCategoryWithId(subjectGroup.category_id)?.german_name}
          >
            <h3 className="font-semibold text-lg">
              {getCategoryWithId(subjectGroup.category_id)?.name}
            </h3>
          </div>
          <div className="flex">
            <p
              className={
                "mr-8 transition-all " +
                (collapsed ? " opacity-100" : " opacity-0")
              }
            >
              {Number(sumEcts(includePlanned, subjectGroup))}/
              {getCategoryWithId(subjectGroup.category_id)?.requirements}
            </p>
            <p
              className={
                "mr-8 transition-all " +
                (collapsed ? " opacity-100" : " opacity-0")
              }
            >
              {Number(
                avgGrades({
                  includePlanned: includePlanned,
                  subjectGroup: subjectGroup,
                })
              )}
            </p>
          </div>
        </div>
      )}
    >
      <div className="overflow-x-auto">
        <table className="table table-fixed w-full -mt-4">
          <thead className="">
            <tr className="">
              <th className="w-5/12 text-left z-index0-force"></th>
              <th className="w-1/12 text-center">Semester</th>
              <th className="w-1/12 text-right">ECTS</th>
              <th className="w-1/12 text-right">Grade</th>
              <th className="w-1/12"></th>
            </tr>
          </thead>
          <tbody>
            {subjectGroup.subjects.map((subject) => (
              <SubjectTableRow
                subject={subject}
                key={subject.id}
              ></SubjectTableRow>
            ))}
            <tr className="">
              <td className="text-left pr-2 bg-base-200">Total</td>
              <td className="bg-base-200 pr-2"></td>
              <td className="text-right bg-base-200 pr-2">
                {Number(sumEcts(includePlanned, subjectGroup))}/
                {getCategoryWithId(subjectGroup.category_id)?.requirements}
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
      </div>
    </Collapsible>
  );
};

export default SubjectGroupCollapsible;

//Edit button
const SubjectTableRow = ({ subject }: { subject: SubjectData }) => {
  const [showEditButton, setShowEditButton] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    console.log("opening modal with subject ", subject);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <EditSubjectModal
        isOpen={modalIsOpen}
        closeModal={closeModal}
        subject={subject}
      ></EditSubjectModal>
      <tr
        onMouseEnter={() => setShowEditButton(true)}
        onMouseLeave={() => setShowEditButton(false)}
        onClick={openModal}
        key={subject.id}
        className={" cursor-pointer " + (subject.planned ? "opacity-30" : "")}
      >
        <td className="truncate text-left pr-2">{subject.name}</td>
        <td className="truncate pr-2">
          <div className="flex justify-end">
            <SemesterPill semester={subject.semester}></SemesterPill>
          </div>
        </td>
        <td className="pr-2 text-right">{subject.credits}</td>
        <td className="pr-2 text-right">{subject.grade}</td>

        <td
          className={
            "transition-all w-1/6 " +
            (showEditButton ? " opacity-100" : " opacity-0")
          }
        >
          <button className="">
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
    </>
  );
};
