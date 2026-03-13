import React from "react";
import { Link } from "react-router-dom";
import exploreGrainsImage from "../assets/grain_default_image2.jpg";

const RightViewGrainCard = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-2">
      <div className="bg-white/25 backdrop-blur-sm rounded-2xl p-1 shadow-xl text-center">
        <img
          src={exploreGrainsImage}
          alt="Explore Grains"
          className="rounded-lg mb-4 h-20 object-cover mx-auto "
        />
        <Link
          to="/grain"
          className="block bg-green-600 text-white text-sm px-0 py-2 rounded-full"
        >
          View Grains
        </Link>
      </div>
    </div>
  );
};

export default RightViewGrainCard;
