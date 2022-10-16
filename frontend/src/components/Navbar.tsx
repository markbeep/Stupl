import { Link, Navigate, Route, Routes } from "react-router-dom";
import { removeToken, useAuth } from "../authHanlder";

export const Navbar = () => {
  const { setToken } = useAuth();
  const logout = () => {
    if (setToken == null) return;
    removeToken();
    setToken(null);
  };

  return (
    <nav className="navbar bg-transparent">
      <div
        className="
      container mx-auto"
      >
        <div className="flex justify-between items-baseline w-full">
          <Link to="/">
            <a className="btn btn-ghost normal-case text-xl">Logo</a>
          </Link>
          <div>
            <button
              className="float-right btn btn-ghost normal-case"
              onClick={logout}
            >
              Log Out
            </button>
            <Link to="/About">
              <button className="float-right btn btn-ghost normal-case">
                About Us
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
