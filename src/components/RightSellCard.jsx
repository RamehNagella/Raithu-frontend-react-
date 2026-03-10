import React from "react";
import { Link } from "react-router-dom";
import rightActionImage from "../assets/icon.jpg";
import addGrains from "./AddGrains";

const RightSellCard = () => {
  return (
    <div className="w-40">
      {/* GLASS CARD */}
      <div className="relative group bg-white/10 backdrop-blur-sm rounded-2xl p-4 shadow-xl text-center border-l-2 border-b-4 border-yellow-500">
        {/* RIGHT HALF YELLOW OVERLAY  Squar type effect*/}
        {/* <div
          className="
            absolute top-0 right-0
            w-1/2 h-full
            bg-gradient-to-l from-orange-400/60 via-yellow-500/50 to-transparent
            opacity-0
            group-hover:opacity-100
            transition-opacity duration-300
            rounded-r-2xl
          "
          
          
        ></div> */}
        {/* RIGHT HALF YELLOW OVERLAY  Circle type effect*/}

        <div
          className="
                absolute
                -right-10 top-1/2
                w-40 h-40
                -translate-y-1/2
                rounded-full
                bg-yellow-500/90
                blur-2xl
                opacity-0
                group-hover:opacity-100
                transition-opacity duration-300
              "
        ></div>
        {/* CONTENT (Put above overlay) */}
        <div className="relative z-10">
          <img
            src={rightActionImage}
            className="rounded-lg mb-3"
            alt="Sell Grain"
          />

          <p className="font-semibold text-gray-800 mb-2">
            Sell Your Grain Here
          </p>
          <Link
            to="/add-grain"
            onClick={addGrains}
            className="bg-pink-600 text-white px-4 py-2 rounded-full text-sm font-medium"
          >
            Sell Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RightSellCard;
