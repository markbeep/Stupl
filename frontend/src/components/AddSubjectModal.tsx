import React from "react";
import Modal from "react-modal";

type Props = { isOpen: boolean };

const AddSubjectModal = (props: Props) => {
  return (
    <Modal
      isOpen={props.isOpen}
      onAfterOpen={() => {}}
      onRequestClose={() => {}}
      style={customStyles}
      contentLabel="Example Modal"
    >
      {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
      <button onClick={closeModal}>close</button> */}
      <div>I am a modal</div>
      <form>
        <input />
        <button>tab navigation</button>
        <button>stays</button>
        <button>inside</button>
        <button>the modal</button>
      </form>
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
  },
};

export default AddSubjectModal;
