import { useRequest } from "ahooks";
import { SubjectData } from "../data";
import { TestWord } from "./interfaces";

export async function loginUser(email: string, password: string) {
  const options = {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch("/auth/login/", options);
  if (response.status == 200) {
    const data = await response.json();
    return data["token"] as string;
  } else {
    return "invalid login";
  }
}

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
  const options = {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch("/auth/register/", options);
  console.log("test");
  console.log(response);
  if (response.status == 200) {
    const data = await response.json();
    return data["token"] as string;
  } else {
    return "invalid login";
  }
};
