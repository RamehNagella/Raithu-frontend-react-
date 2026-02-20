import React from "react";
import navbarBg from "./assets/navbar1-bg.jpg";
const NavBar = () => {
  return (
    <div
      className="navbar h-24 bg-cover bg-center relative px-4 rounded-xl overflow-hidden top-0 z-50 sticky shadow-sm"
      style={{ backgroundImage: `url(${navbarBg})` }}
    >
      <div className="relative z-10 w-full text-orange-600">
        <div className="absolute left-[15%] top-1/2 -translate-y-1/2 flex flex-col">
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
        <div className="dropdown dropdown-end mx-1">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar w-12 h-12"
          >
            <div className="w-14 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
