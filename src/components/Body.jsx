import React, { useEffect, useState } from "react";
import {
  CookingPot,
  Layers,
  Leaf,
  Package,
  ShoppingCart,
  Truck,
  Wheat,
} from "lucide-react";
import NavBar from "./NavBar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import CircleAction from "./CircleAction";
import RightSellCard from "./RightSellCard";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [expand, setExpand] = useState(false);
  console.log(location.pathname);
  const user = useSelector((store) => store.user);
  const isLoggedIn = !!user?.user?.emailId;

  const hideSelllCardRoutes = ["/cart", "/orders", "/track", "/grain/order"];
  // const shouldHideSellCard = hideSelllCardRoutes.includes(location.pathname);
  const shouldHideSellCard = hideSelllCardRoutes.some(
    (route) =>
      location.pathname === route || location.pathname.startsWith(route + "/"),
  );

  const fetchUser = async () => {
    try {
      // if (userData?.user !== null && userData?.user !== undefined) return; // If user data already exists in the store, skip fetching
      //make page loggedIn even after refresh
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });

      dispatch(addUser(res.data?.user));
    } catch (err) {
      const status = err?.response?.status;

      // if (status === 401) {
      //   navigate("/login");
      // } else {
      //   console.error("Unexpected error:", err);
      // }
      if (status !== 401) {
        console.error("Unexpected error:", err);
      }
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    // <div className="min-h-screen flex flex-col">

    <div className="app-container">
      <NavBar />

      {/* <div className="fixed left-4 top-20 bottom-20 z-50 w-20 flex flex-col gap-4 items-center bg-gray-100/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg "> */}
      <div className="fixed left-1 top-28 bottom-20 z-50 w-20 lg:w-24 flex flex-col gap-3 items-center bg-gray-300/10 backdrop-blur-md rounded-3xl py-6 px-2 shadow-xl border border-orange-900">
        <CircleAction
          icon={<Wheat size={20} />}
          label="Grains"
          to="/grain"
          bgColor="bg-violet-500"
        />
        <CircleAction
          icon={<Leaf size={20} />}
          label="Organic"
          to="/organic"
          bgColor="bg-green-500"
        />
        <CircleAction
          icon={<Layers size={20} />}
          label="Non-Organic"
          to="/non-organic"
          bgColor="bg-orange-600"
        />
        <CircleAction
          icon={<CookingPot size={20} />}
          label="Rice"
          to="/rice"
          bgColor="bg-green-600"
        />
        {/* LEFT FIXED SIDEBAR */}
        {isLoggedIn && (
          <>
            <CircleAction
              icon={<ShoppingCart size={20} />}
              label="Cart"
              to="/cart"
              bgColor="bg-blue-900"
            />
            <CircleAction
              icon={<Package size={20} />}
              label="Orders"
              to="/orders"
              bgColor="bg-blue-900"
            />
            <CircleAction
              icon={<Wheat size={20} />}
              label="Your Grains"
              to="/my-grains"
              bgColor="bg-blue-900"
            />
            <CircleAction
              icon={<Truck size={20} />}
              label="Track"
              to="/track"
              bgColor="bg-blue-900"
            />
          </>
        )}
      </div>
      {/* PAGE CONTENT */}
      <main className="app-content  px-4 sm:px-6 lg:ml-28">
        <Outlet />
      </main>
      {isLoggedIn && !shouldHideSellCard && (
        <div className="fixed right-2 md:right-6 top-1/5 -translate-y-1/2 z-[99999]">
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
            <RightSellCard />
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Body;
