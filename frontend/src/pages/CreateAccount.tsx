import React, { useState } from "react";
import { registerUser } from "../api/api";
import axios from "axios";
import { saveToken, useAuth } from "../authHanlder";
import { Link, Navigate } from "react-router-dom";
import logo from "../data/logo2.png";

type Props = {};

const CreateAccount = (props: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { token, setToken } = useAuth();

  // loadTestHello().then(console.log).catch(console.error);

  // axios.get("/api/hello/").then((response) => {
  //   // setText(response.data.text);
  //   // setAuthor(response.data.author);
  //   console.log(response.data);
  // });

  const handleSubmit = async () => {
    // setToken(await loginUser(email, password));

    if (setToken == null) return;

    if (email.length === 0 || password.length === 0) {
      alert("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    const response = await registerUser(email, password);
    // console.log(response);
    saveToken(response.token);
    setToken(response.token);
    // console.log("auth successfull");
  };

  return (
    <>
      {token && <Navigate to="/home" replace />}
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img className="mx-auto h-14 w-auto" src={logo} />

            <h1 className="mt-6 text-center text-5xl font-bold tracking-tight text-accent-content">
              BibStreetBoys
            </h1>
            <h4 className="mt-4 text-center text-md text-base-content">
              Plan your studies
            </h4>
          </div>
          <form className="mt-6">
            <div className="mt-10 rounded-md shadow-sm">
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
                    setConfirmPassword(e.target.value);
                  }}
                />
              </div>
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="input input-bordered w-full bg-base-200 mt-2"
                  placeholder="Confirm Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
            </div>
          </form>

          <div>
            <button
              className="mt-4 btn btn-primary flex w-full justify-center"
              onClick={() => handleSubmit()}
            >
              Register
            </button>
          </div>
          <div className="mt-2 flex justify-end items-baseline">
            <div className="text-sm mr-4">
              <a className="">Already have an Account?</a>
            </div>
            <Link to="/login" className="link text-sm">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

//export default LoginPage;
export default CreateAccount;
