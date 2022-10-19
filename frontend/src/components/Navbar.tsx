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
    <nav className="navbar bg-transparent">
      <div
        className="
      container mx-auto"
      >
        <div className="flex justify-between items-center w-full ">
          <Link to="/home">
            <img width={92} height={29} alt="logo" src={logo} />
          </Link>
          <div>
            <Link to="/About">
              <button className="btn btn-ghost normal-case">About Us</button>
            </Link>
            <Link to="/DataProtectionPolicy">
              <button className="btn btn-ghost normal-case">Data Policy</button>
            </Link>
            <Link
              to="/login"
              // to="/login"
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
