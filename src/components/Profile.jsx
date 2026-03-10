import React, { useEffect, useReducer, useState } from "react";
import { useSelector } from "react-redux";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const getUserData = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      setUserData(res.data?.data);
    } catch (err) {
      setError(err.response?.data?.message);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div>
      {/* Loading */}
      {!userData && (
        <div className="text-center text-lg text-gray-700 font-semibold">
          Loading Profile...
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="text-center text-red-600 font-semibold bg-red-100 py-2 rounded-lg">
          {error}
        </div>
      )}
      <div>
        <UserCard user={userData} />
      </div>
    </div>
  );
};

export default Profile;
