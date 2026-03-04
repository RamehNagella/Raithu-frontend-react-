import React from "react";
import useGrains from "../hooks/useGrains";
import GrainTypeForm from "../components/GrainTypeForm";

const RicePage = () => {
  const { grains, isLoading, error } = useGrains();

  return (
    <GrainTypeForm
      grains={grains}
      // grainType="rice"
      filterFn={(grain) => grain.grainType === "rice"}
      isLoading={isLoading}
      error={error}
      emptyMessage="😔 Sorry we don't have Rice Grains🌾"
    />
  );
};

export default RicePage;

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addFeed } from "../utils/feedSlice";
// import GrainCard from "../components/GrainCard";
// import { BASE_URL } from "../utils/constants";
// import axios from "axios";

// const RicePage = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");

//   const grains = useSelector((store) => store.feed);
//   const dispatch = useDispatch();

//   const getGrains = async () => {
//     if (grains?.items?.length > 0) return;
//     try {
//       setIsLoading(true);
//       const res = await axios.get(BASE_URL + "/grain/grains", {
//         withCredentials: true,
//       });
//       dispatch(addFeed(res?.data?.data));
//     } catch (err) {
//       setError(
//         err?.response?.data?.message ||
//           "Failed to Fetch Rice Grains Try after some time",
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     getGrains();
//   }, []);

//   return (
//     <div>
//       {/* Loading */}
//       {isLoading && (
//         <div className="text-center text-lg font-semibold">
//           Loading Grains....⏳
//         </div>
//       )}
//       {/* Error */}
//       {error && (
//         <div className="text-center text-red-600 font-semibold bg-red-100 py-2 rounded-lg">
//           😕 {error}
//         </div>
//       )}
//       {/* No Orders */}
//       {!isLoading && grains?.items?.length === 0 && !error && (
//         <div className="text-center text-gray-600">
//           😔 We don't have Rice Grains....🌾
//         </div>
//       )}
//       <div>
//         {grains?.items
//           ?.filter((grain) => grain.grainType === "rice")
//           .map((grain) => (
//             <GrainCard key={grain._id} grain={grain} />
//           ))}
//       </div>
//     </div>
//   );
// };

// export default RicePage;
