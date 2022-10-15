import { Link } from "react-router-dom";

export const Navbar = () => (
  <nav className="navbar bg-transparent">
    <div className="container mx-auto">
      <div className="flex justify-between items-center w-full">
        <Link to="/">
          <a className="btn btn-ghost normal-case text-xl">Logo</a>
        </Link>
        <Link to="/account">Account</Link>
      </div>
    </div>
  </nav>
);
