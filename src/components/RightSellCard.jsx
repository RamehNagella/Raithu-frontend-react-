import React from "react";
import { Link } from "react-router-dom";
import rightActionImage from "../assets/icon.jpg";

const RightSellCard = () => {
  return (
    <div className="fixed top-72 right-4 z-50 w-40">
      <div className="bg-white/25 backdrop-blur-sm rounded-2xl p-4 shadow-xl text-center">
        <img src={rightActionImage} className="rounded-lg mb-3" />
        <p className="font-semibold mb-2">Sell Your Grain Here</p>
        <Link
          to="/add-grain"
          className="bg-pink-600 text-white px-4 py-2 rounded-full text-sm font-medium"
        >
          Sell Now
        </Link>
      </div>
    </div>
  );
};

export default RightSellCard;
