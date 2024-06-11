import AuthButton from "../AuthButton/AuthButton";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="headerContainer border-b-2 sticky top-0 z-50 bg-white">
      <div className="headerWrapper p-4 md:container md:mx-auto flex items-center justify-between">
        <div className="left flex items-center justify-center gap-8 font-medium">
          <span className="text-sky-500 text-lg">
            <NavLink to={"/"}>INTERNSPOT</NavLink>
          </span>
          <span>Internships</span>
          <span>Jobs</span>
          <span>Courses</span>
        </div>
        <div className="right flex items-center justify-center gap-8">
          <div className="searchContainer flex gap-4">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search"
              className="focus:outline-none"
            />
          </div>

          <NavLink to={"/auth/login"}>
            <AuthButton data={"Login"} />
          </NavLink>

          <NavLink to={"/auth/register"}>
            <AuthButton data={"Register"} />
          </NavLink>

          <AuthButton data={"Employer Sign-up"} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
