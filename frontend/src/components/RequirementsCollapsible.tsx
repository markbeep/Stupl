import { useRequest } from "ahooks";
import axios from "axios";
import { type } from "os";
import { useEffect, useState } from "react";
import { getAllRequirements, getAllSubjects } from "../api/api";
import { useAuth } from "../authHanlder";
import Collapsible from "../components/Collapsible";
import { requirementsData, RequirementsData } from "../data/yanick_data";
import { useDisplayOptions } from "../pages/HomePage";

export const RequirementsCollapsible = ({
  includePlanned: includePlanned,
}: {
  includePlanned: boolean;
}) => {
  const { token } = useAuth();
  const { refreashId } = useDisplayOptions();
  const { data, error, loading, refresh } = useRequest(() =>
    getAllRequirements(token)
  );

  useEffect(() => {
    refresh();
  }, [refreashId]);

  // console.log("data", data);

  type Requirement = {
    sat: boolean;
    sat2: boolean;
    name: string;
  };
  const requis: Requirement[] = data;

  // console.log("requis: ", requis);

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
          {requis &&
            requis.map((re) => (
              <tr>
                <td className="pr-2">
                  {(includePlanned ? re.sat : re.sat2) ? (
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
                      className="text-green-800 feather feather-check"
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
                      stroke="CurrentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-red-800 feather feather-x "
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  )}
                </td>
                <td className="text-left pr-2">{re.name}</td>
              </tr>
            ))}

          <tr className="">
            <td className="bg-base-200 pr-2">
              {requis &&
              requis.reduce((accumulator, currentValue) => {
                return (
                  accumulator &&
                  (includePlanned ? currentValue.sat : currentValue.sat2)
                );
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
                  className="text-green-600 feather feather-check"
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
                  className="text-red-600 feather feather-x "
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              )}
            </td>

            <td className="bg-base-200 text-left pr-2">
              {requis &&
              requis.reduce((accumulator, currentValue) => {
                return (
                  accumulator &&
                  (includePlanned ? currentValue.sat : currentValue.sat2)
                );
              }, true) ? (
                <p className="text-green-600 bg-base-200 pr-2">
                  Passed all requirements, congrats!
                </p>
              ) : (
                <p className="text-red-600 bg-base-200 pr-2">
                  Failed some requirements!
                </p>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </Collapsible>
  );
};