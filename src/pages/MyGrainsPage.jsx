import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import GrainCard from "../components/GrainCard";

const MyGrains = () => {
  const [grains, setGrains] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalGrains, setTotalGrains] = useState(0);
  const [error, setError] = useState("");

  const user = useSelector((store) => store.user);
  const isLoggedIn = !!user?.user?.emailId;
  // in this page we  just dislay the grains which are created by loggedIn user
  // in the grain Date we have sellerId means user Id who is created
  // verify that sellerId is same as loggedIn user.Id
  // if it gets true then display those grains who stasfyies this condition
  //This grains are displayed only if user is loggedIn and loggedIn userId is same as SellerId
  // const grains = useSelector((store => store.feed));

  const getGrains = async () => {
    setIsLoading(true);
    setError("");

    try {
      const res = await axios.get(`${BASE_URL}/grain/my-grains`, {
        withCredentials: true,
      });

      setGrains(res?.data?.data);
      setTotalGrains(res?.data?.count);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to fetch orders");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getGrains();
  }, []);
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        My Grains{" "}
      </h1>

      {/* Loading */}
      {isLoading && (
        <div className="text-center text-lg font-semibold">
          Loading orders...
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="text-center text-red-600 font-semibold bg-red-100 py-2 rounded-lg">
          {error}
        </div>
      )}

      {/* No Orders */}
      {!isLoading && grains.length === 0 && !error && (
        <div className="text-center text-gray-600">
          You don’t have your own grains yet.
        </div>
      )}
      <section className="flex-grow px-3 py-4 pb-24">
        <div className="max-w-md mx-auto space-y-4">
          {grains?.map((grain) => (
            <GrainCard key={grain._id} grain={grain} isGetMode={true} />
          ))}
        </div>
      </section>
      {/* Total Orders Count */}
      <div className="mt-6 p-2 font-bold text-center text-violet-700 text-2xl bg-gray-50 border-2 border-primary rounded-lg shadow-md">
        Total Grains : {totalGrains}
      </div>
    </div>
  );
};

export default MyGrains;
