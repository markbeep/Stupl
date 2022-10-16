import { useRequest } from "ahooks";
import React, { useState } from "react";
import { getAllVVZLectures } from "../api/api";
import { VVZSubject } from "../api/schemas";
import AddSubjectModal from "./AddSubjectModal";

type Props = {};

const SearchBar = (props: Props) => {
  const [searchText, setSearchText] = useState<string>();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [vvzSubjectPreset, setVvzSubjectPreset] = useState<VVZSubject | null>(
    null
  );

  const openModal = (subject: VVZSubject) => {
    console.log(subject);
    setSearchText("");
    setVvzSubjectPreset(subject);
    setModalIsOpen(true);
  };

  return (
    <div className="w-full z-10">
      {vvzSubjectPreset && (
        <AddSubjectModal
          isOpen={modalIsOpen}
          closeModal={() => {
            setModalIsOpen(false);
            setVvzSubjectPreset(null);
          }}
          subjectPreset={vvzSubjectPreset!}
        ></AddSubjectModal>
      )}
      {/* <button
        className="btn btn-primary"
        onClick={() => {
          setModalIsOpen(true);
        }}
      >
        click
      </button> */}
      <div className="relative">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-primary focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search Subjects"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <SearchBarNameList
          searchText={searchText}
          openModal={openModal}
        ></SearchBarNameList>
      </div>
    </div>
  );
};

type SearchBarNameListProps = {
  searchText?: string;
  openModal: (subject: VVZSubject) => void;
};

const SearchBarNameList = ({
  searchText,
  openModal,
}: SearchBarNameListProps) => {
  const { data, error, loading } = useRequest(getAllVVZLectures);
  const getLecturesStartingWith = (lectureData: VVZSubject[], prefix: string) =>
    lectureData.filter((d) =>
      d.name.toLowerCase().includes(prefix.toLowerCase())
    );

  if (searchText == null || searchText.length == 0) return null;

  if (loading || !!error) return <div>Loading/Error</div>;

  const lectures = getLecturesStartingWith(data, searchText);
  if (lectures.length == 0) {
    return (
      <ul
        tabIndex={0}
        className="absolute dropdown-content menu p-2 shadow-md bg-base-200 rounded-box w-full"
      >
        <li>
          <button
            className="flex justify-between"
            onClick={() => console.log("TODO")}
          >
            <p>🍔 Nothing here...</p>
            <p>Click to create Custom Subject</p>
          </button>
        </li>
      </ul>
    );
  }

  return (
    <ul
      tabIndex={0}
      className="absolute dropdown-content menu p-2 shadow-md bg-base-200 rounded-box w-full"
    >
      {lectures.slice(0, 5).map((lecture) => (
        <li>
          <button onClick={() => openModal(lecture)}>{lecture.name}</button>
        </li>
      ))}
    </ul>
  );
};

export default SearchBar;
