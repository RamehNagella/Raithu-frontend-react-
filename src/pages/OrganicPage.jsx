import React from "react";
import GrainTypeForm from "../components/GrainTypeForm";
import useGrains from "../hooks/useGrains";

const OrganicPage = () => {
  const { grains, isLoading, error } = useGrains();
  return (
    <GrainTypeForm
      grains={grains}
      // grainType={(isOrganic = true)}
      filterFn={(grain) => grain.isOrganic === true}
      isLoading={isLoading}
      error={error}
      emptyMessage="😔 Sorry we don't have Organic Grains🌿"
    />
  );
};

export default OrganicPage;

// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { BASE_URL } from "../utils/constants";
// import GrainCard from "../components/GrainCard";
// import { addFeed } from "../utils/feedSlice";

// const OrganicPage = () => {
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
//       console.log(res);
//       dispatch(addFeed(res?.data?.data));
//     } catch (err) {
//       setError(
//         err?.response?.data?.message ||
//           "Failed to Fetch Organic Grains Try after some time",
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
//           😔 Sorry we don't have Organic Grains🌿
//         </div>
//       )}
//       <div>
//         {grains?.items
//           ?.filter((grain) => grain.isOrganic)
//           .map((grain) => (
//             <GrainCard key={grain._id} grain={grain} />
//           ))}
//       </div>
//     </div>
//   );
// };

// export default OrganicPage;
