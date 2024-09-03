import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Header.css";
import { faRightToBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Separator from "../Separator/Separator";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Redux/ApiSlices/authSlice";
import { toast } from "react-toastify";
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [display, setDispaly] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const role = user?.data?.user?.employee?.roles[0]?.role_id;

  const handelNav = () => {
    document.getElementById("navbar-user").classList.toggle("hidden");
  };
  const handelLogout = () => {
    dispatch(logout())
      .unwrap()
      .then((res) => {
        navigate("/login", { replace: true });
        if (window.sessionStorage.getItem("id") != null) {
          window.sessionStorage.removeItem("id");
        }
        return toast.success(res.data);
      })
      .catch((rej) => {
        return toast.error(rej?.response?.data?.errors);
      });
  };

  return (
    <nav
      className="bg-[#0c1524]  border-gray-200 dark:bg-gray-900 fixed w-full top-0 left-0  z-[1000] "
      id="nav"
    >
      <div className="flex flex-wrap items-center justify-between mx-auto p-5">
        <Link
          to={role == undefined ? "/" : "#"}
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="/assets/images/logo_wings.png"
            className="h-8 sm:h-[38px]  lg:h-[42px] "
            alt="Logo"
          />
        </Link>
        {user ? (
          <div className=" hidden md:flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              onClick={() => {
                setDispaly(!display);
              }}
              type="button"
              className="flex relative text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              id="user-menu-button"
              aria-expanded="false"
              data-dropdown-toggle="user-dropdown"
              data-dropdown-placement="bottom"
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="w-7 h-7 sm:w-9 sm:h-9 lg:w-11 lg:h-11 rounded-full bg-white_color"
                src="/assets/images/user-avatar.png"
                alt="user photo"
              />
              <i className="bi bi-person-circle"></i>
            </button>
            {/* <!-- Dropdown menu --> */}
            {display && (
              <div
                className="z-50 absolute p-5 top-[65%] right-[2%] my-4 text-base  divide-y divide-gray-500   rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
                id="user-dropdown"
              >
                <div className="px-4 py-3 shadow-sm shadow-primary_color">
                  <span className="block text-sm text-gray-900 dark:text-white my-2">
                    {user?.data?.user?.employee
                      ? user?.data?.user?.employee?.name
                      : user?.data?.user?.passenger?.travel_requirement
                          ?.first_name +
                        " " +
                        user?.data?.user?.passenger?.travel_requirement
                          ?.last_name}
                  </span>
                  <span className="block text-sm  text-primary_color truncate ">
                    {user?.data?.user?.email}
                  </span>
                </div>
                <ul className="py-2 my-2" aria-labelledby="user-menu-button">
                  <li>
                    <Link
                      to={role === 4 ? "/admin_dashboard/profile" : role !== undefined ? "/dashboard/employee/profile" : "/profile"}
                      onClick={() => {
                        setDispaly(!display);
                      }}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      {"profile"}
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() => {
                        setDispaly(!display), handelLogout();
                      }}
                      className="block px-4 py-2 text-sm shadow-md hover:shadow-secoundary_color text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Sign out
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div className="md:order-2  shadow-sm shadow-secoundary_color justify-center items-center gap-1 cursor-pointer hidden md:flex">
            <Link to="login">
              <FontAwesomeIcon
                icon={faUser}
                className="text-[13px] cursor-pointer hidden lg:block lg:text-[20px] text-white_color  rounded-xl hover:text-primary_color"
              />
            </Link>

            <div className="text-white text-[12px] lg:text-[18px] ">
              <Link
                to="login"
                className="p-2 hover:text-primary_color text-[16px] "
              >
                log in
              </Link>
              |
              <Link
                to={"register"}
                className="p-2 hover:text-primary_color text-[16px]"
              >
                register
              </Link>
            </div>
          </div>
        )}

        <button
          onClick={handelNav}
          data-collapse-toggle="navbar-user"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white_color rounded-lg md:hidden hover:bg-black_color focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-user"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className="items-center  hidden justify-between w-full md:flex  md:w-auto md:order-1"
          id="navbar-user"
        >
          {user ? (
            <div className=" md:hidden  right-[2%] text-base mt-3  list-none border-b-4 border-solid border-primary_color divide-y divide-gray-300  bg-[#1f2937]  dark:divide-gray-600">
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900 dark:text-white">
                  {user?.data?.user?.employee
                    ? user?.data?.user?.employee?.name
                    : user?.data?.user?.passenger?.travel_requirement
                        ?.first_name +
                      " " +
                      user?.data?.user?.passenger?.travel_requirement
                        ?.last_name}
                </span>
                <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                  {user?.data?.user?.email}
                </span>
              </div>
              <ul className="py-2 " aria-labelledby="user-menu-button">
                <li>
                  <a
                    href="#"
                    onClick={() => {
                      setDispaly(!display);
                    }}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Profile
                  </a>
                </li>
                <li>
                  <Link
                    onClick={() => {
                      setDispaly(!display), handelLogout();
                    }}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Sign out
                  </Link>
                </li>
              </ul>
            </div>
          ) : null}
          {role == 4 ||
          role == 5 ||
          role == 6 ||
          role == 7 ||
          role == 8 ||
          role == 9 ||
          role == 10 ||
          role == 11 ||
          role == 12 ||
          role == 13 ||
          role == 14 ? null : (
            <ul className="ul flex   flex-col md:font-normal  2xl:font-bold text-[13px]  bg-white_color md:bg-[#0c1524]     p-4 md:p-0 mt-4 border border-gray-100 md:space-x-4 lg:space-x-6 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <NavLink
                  onClick={handelNav}
                  end
                  to="our-services"
                  className="block px-0 lg:px-3  md:text-white_color text-white_color  py-2   rounded md:bg-transparent md:dark:hover:text-blue-500  md:p-0  a"
                  aria-current="page"
                >
                  OUR SERVICES
                </NavLink>
              </li>
              <li>
                <NavLink
                  onClick={handelNav}
                  to="offers"
                  className="block px-0 lg:px-3 py-2  md:text-white_color  rounded hover:bg-gray-100   md:p-0 dark:text-white md:dark:hover:text-blue-500 a dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  OFFERS
                </NavLink>
              </li>
              <li>
                <NavLink
                  onClick={handelNav}
                  to="travel"
                  className="block px-0 lg:px-3 py-2  md:text-white_color  rounded hover:bg-gray-100   md:p-0 dark:text-white md:dark:hover:text-blue-500 a dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  TRAVEL CONDITION
                </NavLink>
              </li>
              <li>
                <NavLink
                  onClick={handelNav}
                  to="about-us"
                  className="block px-0 lg:px-3 py-2  md:text-white_color  rounded hover:bg-gray-100   md:p-0 dark:text-white md:dark:hover:text-blue-500 a dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  ABOUT
                </NavLink>
              </li>
              <li>
                <NavLink
                  onClick={handelNav}
                  to="contact-us"
                  className="block px-0 lg:px-3 py-2  md:text-white_color  rounded hover:bg-gray-100   md:p-0 dark:text-white md:dark:hover:text-blue-500 a dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  CONTACT
                </NavLink>
              </li>
            </ul>
          )}

          {!user && (
            <div className="text-white  p-3 flex flex-col md:hidden  dark:bg-gray-800 border-t-4 border-solid border-primary_color">
              <Link
                onClick={handelNav}
                to="login"
                className="p-2 hover:text-primary_color"
              >
                log in
              </Link>
              <Link
                onClick={handelNav}
                to={"register"}
                className="p-2 hover:text-primary_color"
              >
                register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
