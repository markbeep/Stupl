import React from "react";
import katze from "../data/IMG_8581.jpg"; // with import

type Props = {};

/* const LoginPage = (props: Props) => {
  return <div>Login</div>;
};

 */

const CreateAccount = (props: Props) => {
  const image = require("../data/IMG_8581.jpg").default;
  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div>
            <img className="mx-auto h-14 w-auto" src={katze} />

            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              BibStreetBoys
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              The Smart Study Planner
            </p>
          </div>
          <form className="" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />

            <div className="rounded-md shadow-sm">
              <label htmlFor="email-address" className="mt-10">
                Name
              </label>
              <input
                id="name"
                name="Name"
                type="Name"
                autoComplete="Name"
                required
                className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Name"
              />

              <label htmlFor="email-address" className="sr-only">
                Current Semester
              </label>
              <input
                id="currentSemester"
                name="currentSemester"
                type="currentSemester"
                autoComplete="currentSemester"
                required
                className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Current Semester"
              />

              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email address"
                />
              </div>

              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  //autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Password"
                />
              </div>

              <div>
                <label htmlFor="password" className="sr-only">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  //autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="ConfirmPassword"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                {/* <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span> */}
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

//export default LoginPage;
export default CreateAccount;
