import { useRequest } from "ahooks";
import axios, { AxiosError } from "axios";
import { SubjectData } from "../data";
import { TestWord } from "./interfaces";

export async function loadTestHello() {
  const response = await fetch("/sdapi/hello");
  console.log(response);
  console.log(response.body);
  const data = await response.json();
  console.log("why syntax error", response);
  return { word: data } as TestWord;
}
export function useTestHello() {
  const { error, loading, data, run } = useRequest(() => loadTestHello());
  return { error, loading, data, run } as const;
}

export const createSubject = async (s: SubjectData) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  console.log(s);
  return { success: true };
};

export const registerUser = async (email: string, password: string) => {
  console.log(email, password);
  const response = await axios.post("/auth/register/", { email, password });
  return response.data;
};

export const loginUser = async (email: string, password: string) => {
  console.log(email, password);
  const response = await axios.post("/auth/login/", { email, password });
  return response.data;
};

export const getAllSubjects = async (token: string | null | undefined) => {
  console.log("is this working?");
  const response = await axios.get("api/get_subjects/", {
    headers: {
      authorization: "Token " + token,
    },
  });
  // console.log("herejal<f<dasfkd<alkfj kl<j<i");
  // console.log(response);
  return response.data;
};
