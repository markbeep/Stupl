import { useRequest } from "ahooks";
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

async function loadTestHello() {
  const response = await fetch("/api/hello/");
  const data = await response.json();
  return { word: data } as TestWord;
}
export function useTestHello() {
  const { error, loading, data, run } = useRequest(() => loadTestHello());
  return { error, loading, data, run } as const;
}

async function loadRestricted(token: string) {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Token " + token,
    },
  };
  const response = await fetch("/auth/required/", options);
  return response.status;
}

export function useRestricted(token: string) {
  const { data, loading, error, run } = useRequest(() => loadRestricted(token));
  return { data, loading, error, run };
}
