import { Link } from "react-router-dom";

export const Navbar = () => (
  <nav className="navbar bg-transparent">
    <div className="container mx-auto">
      <div className="flex justify-between items-center w-full">
        <Link to="/">
          <a className="btn btn-ghost normal-case text-xl">Logo</a>
        </Link>
        <button
          className="btn btn-ghost normal-case text-xl"
          onClick={() => console.log("Suck my nuts")}
        >
          Log Out
        </button>
      </div>
    </div>
  </nav>
);
