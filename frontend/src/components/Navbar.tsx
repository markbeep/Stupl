import { Link, Navigate, Route, Routes } from "react-router-dom";
import { removeToken, useAuth } from "../authHanlder";
import logo from "../data/logo-navbar-dark.png";

export const Navbar = () => {
  const { setToken } = useAuth();
  const logout = () => {
    if (setToken == null) return;
    removeToken();
    setToken(null);
  };

  return (
    <nav className="navbar bg-transparent px-4">
      <div
        className="
      container mx-auto"
      >
        <div className="flex justify-between items-center w-full ">
          <Link to="/home">
            <img width={92} height={29} alt="logo" src={logo} />
          </Link>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost md:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-200 rounded-box w-52"
            >
              <li>
                <Link to="/About" className="btn btn-ghost normal-case">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/DataProtectionPolicy"
                  className="btn btn-ghost normal-case"
                >
                  Data Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="btn btn-ghost normal-case"
                  onClick={logout}
                >
                  Log Out
                </Link>
              </li>
            </ul>
          </div>
          <div className="hidden md:block">
            <Link to="/About" className="btn btn-ghost normal-case">
              About Us
            </Link>
            <Link
              to="/DataProtectionPolicy"
              className="btn btn-ghost normal-case"
            >
              Data Policy
            </Link>
            <Link
              to="/login"
              className="btn btn-ghost normal-case"
              onClick={logout}
            >
              Log Out
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
