import { useRequest } from "ahooks";
import axios from "axios";
import { type } from "os";
import { useEffect, useState } from "react";
import { getAllRequirements, getAllSubjects } from "../api/api";
import { useAuth } from "../authHanlder";
import Collapsible from "../components/Collapsible";
import { requirementsData, RequirementsData } from "../data/yanick_data";
import { useDisplayOptions } from "./HomePage";

export const Yanick = () => {
  return (
    <div className="container max-w-xl mx-auto mt-32">
      {/* <div className="mt-12">
        <RequirementsCollapsible></RequirementsCollapsible>
      </div> */}
    </div>
  );
};
