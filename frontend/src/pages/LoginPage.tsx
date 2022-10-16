import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { loginUser } from "../api/api";
import { saveToken, useAuth } from "../authHanlder";
import logo from "../data/logo2.png";

type Props = {};

const LoginPage = (props: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { token, setToken } = useAuth();
  const [error, setError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault(); // prevents refresh
    setError(false);
    if (setToken == null) return;

    if (email.length === 0 || password.length === 0) {
      alert("Please fill in all fields");
      return;
    }
    // setToken(await loginUser(email, password));

    try {
      const response = await loginUser(email, password);
      saveToken(response.token);
      setToken(response.token);
      console.log("auth successfull");
    } catch {
      setError(true);
    }
  };

  return (
    <>
      {token && <Navigate to="/home" replace />}
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img className="mx-auto h-14 w-auto" src={logo} />

            <h1 className="mt-6 text-center text-5xl font-bold tracking-tight text-accent-content">
              Stupl
            </h1>
            <h4 className="mt-4 text-center text-md text-base-content">
              Plan your studies
            </h4>
          </div>
          <form className="mt-6" onSubmit={handleSubmit}>
            <div className="mt-10 rounded-md shadow-sm">
              <div
                className={
                  error ? "tooltip tooltip-open tooltip-error w-full" : ""
                }
                data-tip="invalid login"
              >
                <div>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="input input-bordered w-full bg-base-200"
                    placeholder="Email address"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="input input-bordered w-full bg-base-200 mt-2"
                  placeholder="Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="mt-4 btn btn-primary flex w-full justify-center"
              >
                Sign in
              </button>
            </div>
          </form>
          <div className="mt-2 flex justify-end items-baseline">
            <div className="text-sm mr-4">
              <a className="">No Account yet?</a>
            </div>
            <Link to="/createAccount" className="link text-sm">
              Register now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
