import { useRequest } from "ahooks";
import { useEffect, useState } from "react";
import { getAllRequirements } from "../api/api";
import { Requirement } from "../api/schemas";
import { useAuth } from "../authHanlder";
import Collapsible from "../components/Collapsible";
import { useDisplayOptions } from "../pages/HomePage";

const SuccessIcon = ({ success }: { success: boolean }) =>
  success ? (
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
      stroke="CurrentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-red-600 feather feather-x "
    >
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );

export const RequirementsCollapsible = ({
  includePlanned: includePlanned,
}: {
  includePlanned: boolean;
}) => {
  const { token } = useAuth();
  const { refreashId } = useDisplayOptions();
  const [prevData, setPrevData] = useState();
  const { data, error, loading, refresh } = useRequest(() =>
    getAllRequirements(token)
  );

  useEffect(() => {
    refresh();
  }, [refreashId]);

  // console.log("data", data);
  const requis: Requirement[] = data ?? prevData;

  if (loading && !requis) return <div> Loading ... </div>;
  if (error) return <div> Error ... </div>;
  // console.log("requis: ", requis);

  const isReqFulfilled = (r: Requirement) => (includePlanned ? r.sat : r.sat2);

  const isAllFulfilled = requis.reduce(
    (acc, val) => acc && isReqFulfilled(val),
    true
  );

  return (
    <Collapsible
      headerBuilder={(collapsed) => (
        <div className="font-semibold text-lg">
          <h3>Requirements</h3>
        </div>
      )}
    >
      <div className="overflow-x-auto">
        <table className="table w-full">
          <tbody>
            {requis.map((r) => (
              <tr key={r.name}>
                <td className="w-1">
                  <SuccessIcon success={isReqFulfilled(r)}></SuccessIcon>
                </td>
                <td className="text-left text-clip">{r.name}</td>
              </tr>
            ))}

            <tr className="">
              <td className="bg-base-200">
                <SuccessIcon success={isAllFulfilled}></SuccessIcon>
              </td>

              <td className="bg-base-200 text-left pr-2">
                {isAllFulfilled ? (
                  <p className="text-green-600 bg-base-200">
                    Passed all requirements, congrats!
                  </p>
                ) : (
                  <p className="text-red-600 bg-base-200">
                    Failed some requirements!
                  </p>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Collapsible>
  );
};
