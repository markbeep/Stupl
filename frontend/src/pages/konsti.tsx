import { useState } from "react";

export const Konsti = () => {
  return (
    <div className="tooltip mt-10" data-tip="hello">
      <button className="btn" mt-10>
        Hover me
      </button>
    </div>
  );
};

const SearchBar = () => {
  return (
    <input type="text" placeholder="Search" className="input w-full max-w-xs" />
  );
};

export const SearchBar2 = () => {
  const [searchInput, setSearchInput] = useState(0);

  const countries = [
    { name: "Belgium", continent: "Europe" },
    { name: "India", continent: "Asia" },
    { name: "Bolivia", continent: "South America" },
    { name: "Ghana", continent: "Africa" },
    { name: "Japan", continent: "Asia" },
    { name: "Canada", continent: "North America" },
    { name: "New Zealand", continent: "Australasia" },
    { name: "Italy", continent: "Europe" },
    { name: "South Africa", continent: "Africa" },
    { name: "China", continent: "Asia" },
    { name: "Paraguay", continent: "South America" },
    { name: "Usa", continent: "North America" },
    { name: "France", continent: "Europe" },
    { name: "Botswana", continent: "Africa" },
    { name: "Spain", continent: "Europe" },
    { name: "Senegal", continent: "Africa" },
    { name: "Brazil", continent: "South America" },
    { name: "Denmark", continent: "Europe" },
    { name: "Mexico", continent: "South America" },
    { name: "Australia", continent: "Australasia" },
    { name: "Tanzania", continent: "Africa" },
    { name: "Bangladesh", continent: "Asia" },
    { name: "Portugal", continent: "Europe" },
    { name: "Pakistan", continent: "Asia" },
  ];

  return (
    <>
      {countries.map(({ name, continent }) => (
        <p key={name}>
          {" "}
          {name} {continent}{" "}
        </p>
      ))}
    </>
  );
};
