import React, { useEffect } from "react";
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
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import CircleAction from "./CircleAction";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const isLoggedIn = !!user?.user?.emailId;

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
    <div className="relative min-h-screen">
      <NavBar />
      <div className="fixed left-4 top-24 z-50 flex flex-col gap-6 items-center">
        {/* LEFT FIXED SIDEBAR */}
        {isLoggedIn && (
          <>
            <CircleAction
              icon={<ShoppingCart size={20} />}
              label="Cart"
              to="/cart"
            />
            <CircleAction
              icon={<Package size={20} />}
              label="Orders"
              to="/orders"
            />
            <CircleAction
              icon={<Wheat size={20} />}
              label="Your Grains"
              to="/my-grains"
            />
            <CircleAction
              icon={<Truck size={20} />}
              label="Track"
              to="/track"
            />
          </>
        )}

        <CircleAction icon={<Leaf size={20} />} label="Organic" to="/organic" />
        <CircleAction
          icon={<Layers size={20} />}
          label="Non-Organic"
          to="/non-organic"
        />
        <CircleAction icon={<CookingPot size={20} />} label="Rice" to="/rice" />
      </div>
      {/* PAGE CONTENT */}
      <div className="ml-24">
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};

export default Body;
