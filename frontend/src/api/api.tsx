import { useRequest } from "ahooks";
import axios, { AxiosError } from "axios";
import { SubjectData } from "../data";

export const registerUser = async (email: string, password: string) => {
  const response = await axios.post("/auth/register/", { email, password });
  return response.data;
};

export const loginUser = async (email: string, password: string) => {
  const response = await axios.post("/auth/login/", { email, password });
  return response.data;
};

export const getAllSubjects = async (token: string | null | undefined) => {
  const response = await axios.get("api/get_subjects/", {
    headers: {
      authorization: "Token " + token,
    },
  });

  // get_requirements
  // console.log("herejal<f<dasfkd<alkfj kl<j<i");
  // console.log(response);
  return response.data;
};

export const getAllRequirements = async (token: string | null | undefined) => {
  console.log("Warum liegt hier Stroh?");
  const response = await axios.get("api/get_requirements/", {
    headers: {
      authorization: "Token " + token,
    },
  });

  // get_requirements
  // console.log("herejal<f<dasfkd<alkfj kl<j<i");
  // console.log(response);
  return response.data;
};

// export const createSubject = async (s: SubjectData) => {
//   await new Promise((resolve) => setTimeout(resolve, 500));
//   console.log(s);
//   return { success: true };
// };

export const addSubject = async (token: string, subject: any) => {
  const response = await axios.post("api/add_subject/", subject, {
    headers: {
      authorization: "Token " + token,
    },
  });
  // console.log("herejal<f<dasfkd<alkfj kl<j<i");
  // console.log(response);
  return response.data;
};

export const editSubject = async (token: string, subject: any) => {
  const response = await axios.post("api/edit_subject/", subject, {
    headers: {
      authorization: "Token " + token,
    },
  });
  return response.data;
};

export const deleteSubject = async (token: string, subject_id: number) => {
  const response = await axios.post(
    "api/delete_subject/",
    { subject_id: subject_id },
    {
      headers: {
        authorization: "Token " + token,
      },
    }
  );
  return response.data;
};

export const getAllVVZLectures = async () => {
  const response = await axios.get("api/load_vvz/", {});
  return response.data;
};
