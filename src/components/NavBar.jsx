import React from "react";
import navbarBg from "../assets/navbar1-bg.jpg";
import defaultIcon from "../assets/icon.jpg";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import axios from "axios";

const NavBar = () => {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      return navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err.message);
    }
  };

  return (
    <div
      className="navbar h-24 bg-cover bg-center relative px-4 rounded-xl top-0 z-50 sticky shadow-sm"
      style={{ backgroundImage: `url(${navbarBg})` }}
    >
      <div className="relative z-10 w-full text-orange-600">
        <div className="absolute left-[17%] top-1/2 -translate-y-1/2 flex flex-col">
          {/* <div className="flex flex-col items-center"> */}
          <h1
            className="text-4xl font-bold"
            style={{
              textShadow: "2px 2px 6px yellow",
            }}
          >
            Raithu
          </h1>
          <p
            className="text-l  font-extrabold tracking-wide -mt-2 mx-7 text-accent-content"
            style={{
              textShadow: "0 0 5px yellow, 0 0 10px gold",
              letterSpacing: "0.05em",
            }}
          >
            ఇది నీ కష్టం, నీ ఫలితం
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <div
          className={`text-l font-bold ${
            user?.firstName ? "text-violet-900" : "text-gray-200"
          }`}
          style={{
            fontFamily: "ui-monospace",
            textShadow: user?.firstName
              ? "1px 1px 3px orange, 0 0 7px yellow"
              : "0 0 3px red, 0 0 3px white",
          }}
        >
          {user?.user?.firstName
            ? `Welcome, ${user?.user?.firstName}!`
            : "Welcome user, Login here"}
        </div>
        <div className="dropdown dropdown-end mx-1">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar w-12 h-12"
          >
            <div className="w-14 rounded-full">
              <img alt="user photo" src={user?.user?.photoUrl || defaultIcon} />
            </div>
          </div>
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1000] mt-3 w-52 p-2 shadow"
          >
            {user?.user?.emailId ? (
              <>
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                    <span className="badge">View</span>
                  </Link>
                </li>
                <li>
                  <Link to="/profile/edit" className="justify-between">
                    Profile
                    <span className="badge">Edit</span>
                  </Link>
                </li>
                <li>
                  <Link to="/profile/password" className="justify-between">
                    {" "}
                    New Password
                  </Link>
                </li>
                <li>
                  <Link to="/grain" className="justify-between">
                    Grains
                    <span className="badge">View</span>
                  </Link>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a
                    onClick={handleLogout}
                    className="text-red-600 font-semibold"
                  >
                    Logout
                  </a>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login" className="text-primary font-semibold">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
