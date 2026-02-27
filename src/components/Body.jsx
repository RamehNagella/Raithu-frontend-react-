import React, { useEffect, useState } from "react";
import {
  CookingPot,
  Leaf,
  Package,
  ShoppingCart,
  Truck,
  Wheat,
  Sprout,
  Star,
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

  const hideSelllCardRoutes = ["/cart", "/orders", "/grain/order"];
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
      <div className="fixed left-0 top-28 bottom-20 z-50 w-18 lg:w-24 flex flex-col gap-3 items-center bg-gray-100/10 backdrop-blur-sm rounded-3xl py-6 px-2 shadow-xl border-l-2 border-orange-400">
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
          bgColor="bg-green-600"
        />
        <CircleAction
          icon={<CookingPot size={20} />}
          label="Rice"
          to="/rice"
          bgColor="bg-green-500"
        />
        <CircleAction
          icon={<Sprout size={20} />}
          label="Millets"
          to="/millets"
          bgColor="bg-orange-700"
        />

        {/* LEFT FIXED SIDEBAR */}
        {isLoggedIn && (
          <>
            <CircleAction
              icon={<Wheat size={20} />}
              label="Your Grains"
              to="/my-grains"
              bgColor="bg-blue-900"
            />
            <CircleAction
              icon={<ShoppingCart size={20} />}
              label="My Cart"
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
              icon={<Truck size={20} />}
              label="Track"
              to="/track"
              bgColor="bg-blue-900"
            />
          </>
        )}
        {/* Always fixed at bottom */}
        <div className="absolute bottom-2">
          <CircleAction
            icon={<Star size={10} />}
            label="feedback"
            to="/feedback"
            bgColor="bg-pink-600"
            size="w-12 h-9"
          />
        </div>
      </div>
      {/* PAGE CONTENT */}
      <main className="app-content  px-4 sm:px-6 lg:ml-28">
        <Outlet />
      </main>
      {isLoggedIn && !shouldHideSellCard && (
        <div className="fixed -right-2 md:right-6 top-1/3 -translate-y-1/2 z-[50]">
          <div
            className="
                transform transition-all duration-500 ease-in-out
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
