import React, { useEffect, useState } from "react";
import GrainCard from "./GrainCard";

const GrainTypeForm = ({
  grains,
  filterFn,
  isLoading,
  error,
  emptyMessage,
}) => {
  return (
    <div>
      {/* Loading */}
      {isLoading && (
        <div className="text-center text-lg text-blue-700 font-semibold">
          Loading Grains....⏳
        </div>
      )}
      {/* Error */}
      {error && (
        <div className="text-center text-red-600 font-semibold bg-red-100 py-2 rounded-lg">
          😕 {error}
        </div>
      )}
      {/* No Orders */}
      {!isLoading && grains?.items?.length === 0 && !error && (
        <div className="text-center text-gray-600">{emptyMessage} </div>
      )}
      <div>
        {grains?.items?.filter(filterFn).map((grain) => (
          <GrainCard key={grain._id} grain={grain} />
        ))}
      </div>
    </div>
  );
};

export default GrainTypeForm;
