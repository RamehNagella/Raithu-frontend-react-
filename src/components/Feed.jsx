import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { addFeed, setError } from "../utils/feedSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Graincard from "./GrainCard";
import Footer from "./Footer";
import bgImage from "../assets/screan_bg1.jpg";
import rightActionImage from "../assets/icon.jpg";
import { Link } from "react-router-dom";
import RightSideAction from "./RightSideAction";
// import LeftSideAction from "./LeftSideAction";
import RightSellCard from "./RightSellCard";

const Feed = () => {
  // user
  const user = useSelector((store) => store.user);
  const isLoggedIn = !!user?.user?.emailId;

  const grains = useSelector((store) => store.feed);
  const dispatch = useDispatch();

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

    <div>
      {/* Left actions go here */}
      {/* <aside className="w-20 lg:w-56 hidden lg:flex flex-col items-center pt-6 gap-6">
        {isLoggedIn && <LeftSideAction />}
      </aside> */}
      {/* Cnter - Grain Cards */}
      <section className="flex-grow px-3 py-4 pb-24 ">
        <div className="max-w-md mx-auto space-y-4">
          {grains?.items?.map((grain) => (
            <Graincard key={grain._id} grain={grain} />
          ))}
        </div>
      </section>
      {/* Right side Action */}
      <aside className="w-20 lg:w-56 flex flex-col items-center pt-6 gap-6">
        {/* {!isLoggedIn && (
          <RightSideAction message="To Explore grains" buttonText="Login" />
        )}
        {isLoggedIn && <RightSellCard />} */}
        {!isLoggedIn && (
          <div className="fixed block right-4 md:right-6 top-1/4 -translate-y-1/2 z-[999999]">
            <div
              className="
                transform transition-all duration-700 ease-in-out
                origin-center-right
                scale-50 
                hover:scale-100 
                active:scale-100  
                md:scale-75 
                md:hover:scale-100
              "
            >
              <RightSideAction message="To Explore grains" buttonText="Login" />
            </div>
          </div>
        )}
      </aside>
    </div>
  );
};

export default Feed;
