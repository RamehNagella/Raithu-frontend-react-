import React, { useState } from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((store) => store.user);

  const [error, setError] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [mobile, setMobile] = useState("");

  return <div>Profile</div>;
};

export default Profile;
