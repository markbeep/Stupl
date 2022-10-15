import { useState } from "react";
import Collapsible from "../components/Collapsible";
import { requirementsData, RequirementsData } from "../data/yanick_data";

export const Yanick = () => {
  return (
    <div className="container max-w-xl mx-auto mt-32">
      <div className="mt-12">
        <RequirementsCollapsible></RequirementsCollapsible>
      </div>
    </div>
  );
};

export const RequirementsCollapsible = () => {
  return (
    <Collapsible
      headerBuilder={(collapsed) => (
        <div className="flex justify-between">
          <h3>Requirements</h3>
        </div>
      )}
    >
      <table className="table w-full">
        <tbody>
          {requirementsData.map((req) => (
            <tr>
              <td className="pr-2">
                {req.fullfilled ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-check"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-x "
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                )}
              </td>
              <td className="text-left pr-2">{req.name}</td>
            </tr>
          ))}

          <tr className="">
            <td className="bg-base-200 pr-2">
              {requirementsData.reduce((accumulator, currentValue) => {
                return accumulator && currentValue.fullfilled;
              }, true) ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-check"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-x "
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              )}
            </td>
            <td className="text-left bg-base-200 pr-2">
              {requirementsData.reduce((accumulator, currentValue) => {
                return accumulator && currentValue.fullfilled;
              }, true) ? (
                <p className="bg-base-200 pr-2">
                  Passed all requirements, congrats
                </p>
              ) : (
                <p className="bg-base-200 pr-2">Failed some requirements</p>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </Collapsible>
  );
};
