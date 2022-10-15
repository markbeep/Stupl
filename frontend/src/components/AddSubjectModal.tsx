import React, { useState } from "react";
import Modal from "react-modal";
import SemesterPill from "./SemesterPill";
import Stepper from "./Stepper";

type Props = { isOpen: boolean; closeModal: () => void };

const AddSubjectModal = (props: Props) => {
  const [ectsStepper, setEctsStepper] = useState(7);
  const [semesterStepper, setSemesterStepper] = useState(1);
  const [gradeStepper, setGradeStepper] = useState(5);

  return (
    <Modal
      isOpen={props.isOpen}
      onAfterOpen={() => {}}
      onRequestClose={props.closeModal}
      style={customStyles}
      contentLabel="Example Modal"
      //   className="bg-base-300"
    >
      {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
      <button onClick={closeModal}>close</button> */}
      <div className="container mx-auto w-96">
        <h1 className="text-2xl font-medium">Add Subject</h1>
        {/* <form action="#" method="POST"> */}
        {/* <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full"
        /> */}
        <label className="block text-sm font-medium mt-6">Subject</label>
        <input
          type="text"
          name="first-name"
          id="first-name"
          className="mt-1 input input-bordered w-full"
        ></input>

        <label className="block text-sm font-medium mt-4">Category</label>
        <select className="select select-bordered w-full mt-1">
          <option>Kernfach</option>
          <option>Guess</option>
          <option>Wahlfach</option>
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
            <input type="checkbox" checked={true} className="checkbox" />
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
        <button className="btn btn-primary w-full mt-8">Add</button>
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
