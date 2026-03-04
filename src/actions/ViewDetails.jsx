import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import GrainCard from "../components/GrainCard";

const ViewDetails = () => {
  // get the grainId from useParams
  // take rewquried hooks for error, navigate, loading, grainData
  // get the grainData from backend api using axios
  // call the useEffect with grainData
  // Using GrainCard with updated values display grainData
  const { grainId } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [grainData, setGrainData] = useState(null);

  const fetchGrain = async () => {
    try {
      setIsLoading(true);
      setError("");
      const res = await axios.get(BASE_URL + `/grain/${grainId}`, {
        withCredentials: true,
      });
      // console.log("res: ", res?.data?.data);
      setGrainData(res?.data?.data);
    } catch (err) {
      // console.log("??", err?.response?.data?.message);
      setError(err?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  // console.log("////", grainData);
  useEffect(() => {
    fetchGrain();
  }, [grainId]);
  return (
    <div>
      {/* Loading */}
      {isLoading && (
        <div className="text-center text-lg text-blue-700 font-semibold">
          Loading Grain....⏳
        </div>
      )}
      {/* Error */}
      {error && (
        <div className="text-center text-red-600 font-semibold bg-red-100 py-2 rounded-lg">
          😕 {error}
        </div>
      )}
      {/* No Orders */}
      {!isLoading && !grainData && !error && (
        <div className="text-center text-gray-600">
          " Details not available 😕 "{" "}
        </div>
      )}
      {grainData && (
        <section>
          <div>
            <GrainCard grain={grainData} isDetailsMode={true} />
          </div>
        </section>
      )}
    </div>
  );
};

export default ViewDetails;
/*

import { useParams } from 'react-router-dom';

function ViewDetails() {
  const { id } = useParams(); // Gets the grain._id from URL
  
  // Fetch grain details using this id
  useEffect(() => {
    // API call to get grain details by id
    fetch(`/api/grains/${id}`)
      .then(res => res.json())
      .then(data => setGrain(data));
  }, [id]);
  
  return (
    <div>
//       {/* Show grain details /}
//     </div>
//   );
// }
*/
