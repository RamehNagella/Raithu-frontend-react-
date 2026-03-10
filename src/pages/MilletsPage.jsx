import React, { useEffect, useState } from "react";

import GrainTypeForm from "../components/GrainTypeForm";
import useGrains from "../hooks/useGrains";

const MilletsPage = () => {
  const { grains, isLoading, error } = useGrains();
  // console.log(grains, isLoading, error);
  return (
    <div>
      <GrainTypeForm
        grains={grains}
        // grainType="millet"
        filterFn={(grain) => grain.grainType === "millet"}
        isLoading={isLoading}
        error={error}
        emptyMessage="😔 Sorry we don't have Millet Grains🌾"
      />
    </div>
  );
};

export default MilletsPage;
