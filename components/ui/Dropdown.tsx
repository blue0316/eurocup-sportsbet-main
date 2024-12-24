/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import flags from "../../mocks/flags.json";

const flag: any = flags;

const Dropdown = ({ onSelect, selected }: any) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleSelection = (country: any) => {
    onSelect(country);
    setDropdownOpen(false);
  };

  return (
    <div className="relative w-full max-w-full mx-auto">
      <button
        type="button"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-between"
        onClick={toggleDropdown}
      >
        {selected ? (
          <div className="flex items-center">
            <img
              src={`/flags/${flag.flags[selected]}`}
              alt={selected}
              className="w-6 h-4 mr-2"
            />
            {selected}
          </div>
        ) : (
          "Select Flag"
        )}
        <svg
          className={`w-5 h-5 transition-transform ${
            dropdownOpen ? "transform rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>
      {dropdownOpen && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1 max-h-60 overflow-auto">
          {Object.keys(flag.flags).map((country) => (
            <li
              key={country}
              onClick={() => handleSelection(country)}
              className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              <img
                src={`/flags/${flag.flags[country]}`}
                alt={country}
                className="w-6 h-4 mr-2"
              />
              {country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
