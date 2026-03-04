import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { BASE_URL } from "../utils/constants";
import axios from "axios";

const useGrains = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const grains = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  // console.log("???", grains);
  const getGrains = async () => {
    if (grains?.items?.length > 0) return;
    try {
      setIsLoading(true);
      const res = await axios.get(BASE_URL + "/grain/grains", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Failed to Fetch Grains Try after some time",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getGrains();
  }, []);
  return { grains: grains, isLoading: isLoading, error: error };
};

export default useGrains;
