import { Link } from "react-router-dom";
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
      <div className="container mx-auto">
        <div className="flex justify-between items-baseline w-full">
          <Link to="/">
            <a className="btn btn-ghost normal-case text-xl">Logo</a>
          </Link>
          <button className="btn btn-ghost normal-case" onClick={logout}>
            Log Out
          </button>
        </div>
      </div>
    </nav>
  );
};
