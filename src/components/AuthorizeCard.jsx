import React from "react";
import { useNavigate } from "react-router-dom";

const authorize = ({ errorMessage }) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center px-4">
      <div className="bg-green-200/70 shadow-xl rounded-2xl p-6 text-center w-full max-w-sm">
        <h2 className="text-lg text-gray-900 font-semibold mb-4">
          {errorMessage}
        </h2>
        <button
          className="btn btn-secondary w-full"
          onClick={() => navigate("/login")}
        >
          <p className="text-green-900 font-semibold text-xl ">Login</p>
        </button>
      </div>
    </div>
  );
};

export default authorize;
