import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { BASE_URL } from "../utils/constants";
import axios from "axios";

const useGrains = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const grains = useSelector((store) => store.feed);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  // console.log("???", grains);

  const getGrains = async () => {
    if (grains?.items?.length > 0) return;
    try {
      setIsLoading(true);
      const res = await axios.get(BASE_URL + "/grain/grains", {
        withCredentials: true,
      });
      // console.log("getGrains: ", res.data?.data);

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
  // useEffect(() => {
  //   getGrains();
  // }, []);
  //1. refresh the store afrer first fetch+cacheExpiration

  useEffect(() => {
    const FIFTY_MINUTES = 50 * 60 * 1000;
    if (
      grains.items.length === 0 ||
      !grains.lastFetched ||
      Date.now() - grains.lastFetched > FIFTY_MINUTES
    ) {
      getGrains();
    }
  }, []);

  //2.Refresh when user logs in
  useEffect(() => {
    if (user?.user?.emailId && grains.items.length === 0) {
      getGrains();
    }
  }, [user]);
  // 3. Auto referesh every 1 hour (polling)
  useEffect(() => {
    const interval = setInterval(() => {
      getGrains();
    }, 60000);
  });

  return { grains: grains, isLoading: isLoading, error: error };
};

export default useGrains;

/*
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { BASE_URL } from "../utils/constants";
import axios from "axios";

const useGrains = () => {
  const dispatch = useDispatch();

  const feed = useSelector((store) => store.feed);
  const user = useSelector((store) => store.user);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchGrains = async () => {
    try {
      setIsLoading(true);

      const res = await axios.get(`${BASE_URL}/grain/grains`, {
        withCredentials: true,
      });

      dispatch(addFeed(res?.data?.data));

    } catch (err) {
      setError(
        err?.response?.data?.message ||
        "Failed to Fetch Grains Try after some time"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // 1️⃣ First fetch + cache expiration
  useEffect(() => {
    const FIVE_MIN = 5 * 60 * 1000;

    if (
      feed.items.length === 0 ||
      !feed.lastFetched ||
      Date.now() - feed.lastFetched > FIVE_MIN
    ) {
      fetchGrains();
    }

  }, []);

  // 2️⃣ Refresh when user logs in
  useEffect(() => {
    if (user?.user?.emailId && feed.items.length === 0) {
      fetchGrains();
    }
  }, [user]);

  // 3️⃣ Auto refresh every 5 minutes (polling)
  useEffect(() => {
    const interval = setInterval(() => {
      fetchGrains();
    }, 300000); // 5 minutes

    return () => clearInterval(interval);
  }, []);

  return {
    grains: feed.items,
    isLoading,
    error
  };
};

export default useGrains;
*/
