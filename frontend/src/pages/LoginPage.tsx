import React, { useState } from "react";
import { loginUser, useLogin } from "../api/hooks";
import katze from "../data/IMG_8581.jpg"; // with import

type Props = {};

/* const LoginPage = (props: Props) => {
  return <div>Login</div>;
};

 */

const LoginPage = (props: Props) => {
  const image = require("../data/IMG_8581.jpg").default;
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async () => {
    console.log("aaaaaaaaaaaaaaaaah");
    setToken(await loginUser(email, password));
    console.log(token);
  };
  /*   const {login}
  const {data} = useLogin() */

  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img className="mx-auto h-14 w-auto" src={katze} />

            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              BibStreetBoys
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Plan your studies
            </p>
          </div>
          <form className="mt-6">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="mt-10 rounded-md shadow-sm">
              <div>
                {/* <label htmlFor="email-address" className="">
                  Email address
                </label> */}
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block p-2 pl-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Email address"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div>
                {/* <label htmlFor="password" className="mt-10">
                  Password
                </label> */}
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="mt-2 block p-2 pl-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
            </div>

            <div>
              <button
                //className="mt-2 block p-2 pl-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                className="mt-4 group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-grey-900 hover:bg-indigo-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={handleSubmit}
              >
                Sign in
              </button>
            </div>
            <div className="mt-2 flex justify-end">
              <div className="text-sm mr-4">
                <a className="font-medium text-grey-900">No Account yet?</a>
              </div>
              <div className="text-sm">
                <a
                  href="/createAccount"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Register now
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

//export default LoginPage;
export default LoginPage;
