import React, { useEffect } from "react";
import NavBar from "./NavBar";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user);
  console.log(userData);
  const fetchUser = async () => {
    try {
      if (userData?.user !== null && userData?.user !== undefined) return; // If user data already exists in the store, skip fetching
      //make page loggedIn even after refresh
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data.user));
    } catch (err) {
      const status = err?.response?.status;

      if (status === 401) {
        navigate("/login");
      } else {
        console.error("Unexpected error:", err);
      }
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
