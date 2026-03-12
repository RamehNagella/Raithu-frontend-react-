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
import CircleAction from "./CircleAction";
import RightSellCard from "./RightSellCard";
import RightSideAction from "./RightSideAction";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [expand, setExpand] = useState(false);
  // console.log(location.pathname);

  const user = useSelector((store) => store.user);
  const isLoggedIn = !!user?.user?.emailId;
  const isLoginPath = location?.pathname === "/login";
  // console.log(isLoginPath);
  const [error, setError] = useState("");

  const hideSelllCardRoutes = [
    "/cart",
    "/orders",
    "/grain/order",
    "/add-grain",
  ];
  // const shouldHideSellCard = hideSelllCardRoutes.includes(location.pathname);
  const shouldHideSellCard = hideSelllCardRoutes.some(
    (route) =>
      location.pathname === route || location.pathname.startsWith(route + "/"),
  );

  const hideRightLoginCardRoutes = "";

  const fetchUser = async () => {
    try {
      setError("");
      // if (userData?.user !== null && userData?.user !== undefined) return; // If user data already exists in the store, skip fetching
      //make page loggedIn even after refresh
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res?.data?.user));
    } catch (err) {
      // console.log(">>", err?.response?.data);
      const status = err?.response?.status;
      setError(err?.response?.data || "Failed to see profile");

      if (status && status !== 401) {
        setError(
          err?.response?.data?.message || err.message || "Something went wrong",
        );
      }
    }
  };
  useEffect(() => {
    if (!user?.user?.emailId) {
      fetchUser();
    }
  }, []);

  return (
    // <div className="min-h-screen flex flex-col">

    <div className="app-container">
      <NavBar />

      {/* <div className="fixed left-4 top-20 bottom-20 z-50 w-20 flex flex-col gap-4 items-center bg-gray-100/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg "> */}
      <div className="fixed left-2 top-24 bottom-20 z-50 w-14 lg:w-20 flex flex-col gap-1 items-center bg-gray-100/10 backdrop-blur-sm rounded-3xl py-6 px-2 shadow-xl border-l-2 border-orange-400">
        <CircleAction
          icon={<Wheat size={14} />}
          label="Grains"
          to="/grain"
          bgColor="bg-violet-500"
        />
        <CircleAction
          icon={<Leaf size={14} />}
          label="Organic"
          to="/organic"
          bgColor="bg-green-600"
        />
        <CircleAction
          icon={<CookingPot size={14} />}
          label="Rice"
          to="/rice"
          bgColor="bg-green-500"
        />
        <CircleAction
          icon={<Sprout size={14} />}
          label="Millets"
          to="/millets"
          bgColor="bg-orange-700"
        />

        {/* LEFT FIXED SIDEBAR */}
        {isLoggedIn && (
          <>
            <CircleAction
              icon={<Wheat size={10} />}
              label="YourGrains"
              to="/my-grains"
              bgColor="bg-blue-900"
            />
            <CircleAction
              icon={<ShoppingCart size={14} />}
              label="My Cart"
              to="/cart"
              bgColor="bg-blue-900"
            />
            <CircleAction
              icon={<Package size={14} />}
              label="Orders"
              to="/orders"
              bgColor="bg-blue-900"
            />
            <CircleAction
              icon={<Truck size={14} />}
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
      {!shouldHideSellCard && (
        <div className="fixed -right-4 md:right-6 top-1/4 -translate-y-1/2 z-[50]">
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
      <>
        <div>
          {!isLoginPath && !isLoggedIn && (
            <div className="fixed block right-2 md:right-6 top-1/4 -translate-y-1/2 z-[999999]">
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
                <RightSideAction
                  message="To Explore grains"
                  buttonText="Login"
                />
              </div>
            </div>
          )}
        </div>
      </>
      <Footer />
    </div>
  );
};

export default Body;
