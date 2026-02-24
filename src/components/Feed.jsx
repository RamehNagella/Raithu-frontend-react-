import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { addFeed, setError } from "../utils/feedSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Graincard from "./GrainCard";
import Footer from "./Footer";
import bgImage from "../assets/bg_for_grains.jpg";
import rightActionImage from "../assets/icon.jpg";
import { Link } from "react-router-dom";
import RightSideAction from "./RightSideAction";
import LeftSideAction from "./LeftSideAction";
import RightSellCard from "./RightSellCard";

const Feed = () => {
  // user
  const user = useSelector((store) => store.user);
  console.log("User in feed:", user);
  const isLoggedIn = !!user?.user?.emailId;
  console.log("Is user logged in?", isLoggedIn);

  const grains = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  console.log("Grains in feed:", grains);
  const getGrains = async () => {
    //prevent refetching if data is already present
    if (grains?.items?.length > 0) return;
    try {
      const res = await axios.get(BASE_URL + "/grain/grains", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data?.data));
    } catch (err) {
      // console.log(err);
      dispatch(
        setError(
          err.response?.data?.message ||
            "Somthing went wrong while fetching grains, Try after some time",
        ),
      );
    }
  };

  useEffect(() => {
    getGrains();
  }, []);

  // Loading State
  if (grains?.isLoading) {
    return <div className="text-center mt-10">Loading...</div>;
  }
  // Error state
  if (grains?.error) {
    return (
      <div className="text-center mt-10 text-red-500">{grains.error} </div>
    );
  }
  //Empty state
  if (grains?.items?.length === 0) {
    return <div className="text-center mt-10">No grains available</div>;
  }
  //Success state
  return (
    // <div className="min-h-screen bg-gray-100 px-3 py-4">
    //   <div className="max-w-md mx-auto space-y-4">
    //     <Graincard />
    //   </div>
    // </div>

    // <div className="min-h-screen bg-gray-600 px-3 py-4 pb-24">
    //   <div className="max-w-md mx-auto space-y-4">
    //     {grains?.items?.map((grain) => (
    //       <Graincard key={grain._id} grain={grain} />
    //     ))}
    //   </div>
    // </div>

    <div
      className="flex flex-col min-h-screen bg-cover bg-center bg-no-repeat bg-fixed relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Left actions go here */}
      <aside className="w-20 lg:w-56 hidden lg:flex flex-col items-center pt-6 gap-6">
        {isLoggedIn && LeftSideAction}
      </aside>
      {/* Cnter - Grain Cards */}
      <main className="flex-grow px-3 py-4 pb-24 overflow-y-auto">
        <div className="max-w-md mx-auto space-y-4">
          {grains?.items?.map((grain) => (
            <Graincard key={grain._id} grain={grain} />
          ))}
        </div>
      </main>
      {/* Right side Action */}
      <aside className="w-20 lg:w-56 flex flex-col items-center pt-6 gap-6">
        {/* {!isLoggedIn && (
          <RightSideAction message="To Explore grains" buttonText="Login" />
        )}
        {isLoggedIn && <RightSellCard />} */}
        {isLoggedIn ? (
          <RightSellCard className="w-5" />
        ) : (
          <RightSideAction message="To Explore grains" buttonText="Login" />
        )}
      </aside>
      {/* Footer */}
      <footer className="footer sm:footer-horizontal bg-base-300 text-neutral-content items-center p-4 w-full flex flex-wrap justify-between gap-2" />{" "}
    </div>
  );
};

export default Feed;
