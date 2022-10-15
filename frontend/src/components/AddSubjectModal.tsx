import React, { useState } from "react";
import Modal from "react-modal";
import { addSubject } from "../api/api";
import { categories, VVZSubject } from "../api/schemas";
import { useAuth } from "../authHanlder";
import { SubjectData } from "../data";
import { useDisplayOptions } from "../pages/HomePage";
import SemesterPill from "./SemesterPill";
import Stepper from "./Stepper";

type SubjectPresets = {
  id?: number;
  name?: string;
  ects?: number;
  category?: string;
  allowedCategories?: [string];
};

type Props = {
  isOpen: boolean;
  closeModal: () => void;
  subjectPreset: VVZSubject;
};

const AddSubjectModal = ({ isOpen, closeModal, subjectPreset }: Props) => {
  const [ectsStepper, setEctsStepper] = useState(subjectPreset.credits);
  const [semesterStepper, setSemesterStepper] = useState(1);
  const [gradeStepper, setGradeStepper] = useState(5);
  const [subjectName, setSubjectName] = useState(subjectPreset.name);
  const [category, setCategory] = useState(subjectPreset.category_id);
  const [completedCheckbox, setCompletedCheckbox] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);

  const { token } = useAuth();
  const { requestRefresh } = useDisplayOptions();

  const onSubmit = async () => {
    const data: any = {
      name: subjectName!,
      credits: ectsStepper,
      category: category,
      semester: semesterStepper,
      grade: gradeStepper,
      planned: completedCheckbox,
    };

    setSubmitLoading(true);
    const result = await addSubject(token!, data);
    setSubmitLoading(false);
    console.log(result);
    requestRefresh();
    closeModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      onAfterOpen={() => {}}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div className="container mx-auto w-96">
        <h1 className="text-2xl font-medium">Add Subject</h1>
        <label className="block text-sm font-medium mt-6">Subject</label>
        <input
          type="text"
          name="first-name"
          id="first-name"
          className="mt-1 input input-bordered w-full"
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
        ></input>

        <label className="block text-sm font-medium mt-4">Category</label>
        <select
          className="select select-bordered w-full mt-1"
          onChange={(e) => setCategory(parseInt(e.target.value))}
        >
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <div className="flex items-center mt-4">
          <label className="block flex-1 text-sm font-medium">Semester</label>
          <div className="flex flex-1">
            <Stepper
              onChange={(val) => setSemesterStepper(val)}
              value={semesterStepper}
              stepSize={1}
              minValue={1}
              maxValue={16}
            >
              <div className="my-auto mx-4">
                <SemesterPill semester={semesterStepper}></SemesterPill>
              </div>
            </Stepper>
          </div>
        </div>
        <div className="flex items-center mt-6">
          <label className="block flex-1 text-sm font-medium">Completed</label>
          <div className="flex flex-1">
            <input
              type="checkbox"
              checked={completedCheckbox}
              onClick={(e) => setCompletedCheckbox(!completedCheckbox)}
              className="checkbox"
            />
          </div>
        </div>
        <div className="flex items-center mt-4">
          <label className="block flex-1 text-sm font-medium mt-4">Grade</label>
          <div className="flex mt-2 flex-1">
            <Stepper
              onChange={(val) => setGradeStepper(val)}
              value={gradeStepper}
              stepSize={0.25}
              minValue={1}
              maxValue={6}
            >
              <div className="my-auto mx-2 w-8 text-center">{gradeStepper}</div>
            </Stepper>
          </div>
        </div>
        <div className="flex items-center mt-4">
          <label className="block flex-1 text-sm font-medium mt-4">ECTS</label>

          <div className="flex mt-2 flex-1">
            <Stepper
              onChange={(val) => setEctsStepper(val)}
              value={ectsStepper}
              stepSize={1}
              minValue={1}
            >
              <div className="my-auto mx-4 w-4 text-center">{ectsStepper}</div>
            </Stepper>
          </div>
        </div>
        <button className="btn btn-primary w-full mt-8" onClick={onSubmit}>
          {submitLoading ? "Loading..." : "Add"}
        </button>
      </div>
    </Modal>
  );
};

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "#2A303C",
    border: "none",
  },
  overlay: {
    overlay: { zIndex: 1000 },
    background: "rgba(0, 0,0 , 0.4)",
  },
};

export default AddSubjectModal;
