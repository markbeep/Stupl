import React, { createContext, useContext, useEffect, useState } from "react";

export const saveToken = (token: string) => {
  window.localStorage.setItem("token", token);
};

export const getToken = () => {
  return window.localStorage.getItem("token");
};

export const removeToken = () => {
  window.localStorage.removeItem("token");
};

type Props = { children: React.ReactElement };

type AuthContextType = {
  token?: string | null;
  setToken?: (s: string | null) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: Props) => {
  const [token, setToken] = useState<string | null>();

  useEffect(() => {
    const token = getToken();
    setToken(token!);
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const auth = useContext(AuthContext);
  return { token: auth?.token, setToken: auth?.setToken };
};
