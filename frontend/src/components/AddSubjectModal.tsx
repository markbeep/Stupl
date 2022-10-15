import React from "react";
import Modal from "react-modal";
import SemesterPill from "./SemesterPill";

type Props = { isOpen: boolean; closeModal: () => void };

const AddSubjectModal = (props: Props) => {
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
      <div className="container mx-auto">
        <h1 className="text-2xl font-medium">Add Subject</h1>
        {/* <form action="#" method="POST"> */}
        {/* <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full"
        /> */}
        <label className="block text-sm font-medium mt-6">First name</label>
        <input
          type="text"
          name="first-name"
          id="first-name"
          className="mt-1 input input-bordered w-full"
        ></input>

        <label className="block text-sm font-medium mt-4">Category</label>
        <select className="select select-bordered w-full max-w-xs">
          <option>Kernfach</option>
          <option>Guess</option>
          <option>Wahlfach</option>
        </select>
        <label className="block text-sm font-medium mt-4">Semester</label>
        <div className="flex mt-2">
          <button className="btn btn-sm">+</button>
          <div className="my-auto mx-4">
            <SemesterPill semester={1}></SemesterPill>
          </div>
          <button className="btn btn-sm">-</button>
        </div>
        <div className="flex mt-4 items-center">
          <label className="block text-sm font-medium mr-8">Completed</label>
          <div className="flex">
            <input type="checkbox" checked={true} className="checkbox" />
          </div>
        </div>
        <label className="block text-sm font-medium mt-4">Grade</label>
        <div className="flex mt-2">
          <button className="btn btn-sm">+</button>
          <div className="my-auto mx-4">5.25</div>
          <button className="btn btn-sm">-</button>
        </div>
        <label className="block text-sm font-medium mt-4">ECTS</label>
        <div className="flex mt-2">
          <button className="btn btn-sm">+</button>
          <div className="my-auto mx-4">7</div>
          <button className="btn btn-sm">-</button>
        </div>
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-6 sm:col-span-3">
            {/* <label className="block text-sm font-medium text-gray-700">
                First name
              </label>
              <input
                type="text"
                name="first-name"
                id="first-name"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                {" "}
              </input>
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label className="block text-sm font-medium text-gray-700">
                Last name
              </label>
              <input
                type="text"
                name="last-name"
                id="last-name"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                {" "}
              </input>
            </div>

            <div className="col-span-6 sm:col-span-4">
              <label className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                type="text"
                name="email-address"
                id="email-address"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                {" "}
              </input>
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label className="block text-sm font-medium text-gray-700">
                Country
              </label>
              <select
                id="country"
                name="country"
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              >
                <option>United States</option>
                <option>Canada</option>
                <option>Mexico</option>
              </select>
            </div>

            <div className="col-span-6">
              <label className="block text-sm font-medium text-gray-700">
                Street address
              </label>
              <input
                type="text"
                name="street-address"
                id="street-address"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                {" "}
              </input>
            </div>

            <div className="col-span-6 sm:col-span-6 lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                name="city"
                id="city"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                {" "}
              </input>
            </div>

            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                State / Province
              </label>
              <input
                type="text"
                name="region"
                id="region"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                {" "}
              </input>
            </div>

            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                ZIP / Postal code
              </label>
              <input
                type="text"
                name="postal-code"
                id="postal-code"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                {" "} */}
            {/* </input> */}
          </div>
        </div>
        {/* </form> */}
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
