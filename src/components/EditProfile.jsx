import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";

const EditProfile = () => {
  // get the userdata from get api
  // provide profile update form in the UI AND read the all value
  // take the values from forms and set to the state
  const user = useSelector((store) => store.user);

  const [firstName, setFirstName] = useState(user?.user?.firstName);
  const [lastName, setLastName] = useState(user?.user?.lastName);

  const [photoUrl, setPhotoUrl] = useState(user?.user?.photoUrl);
  const [age, setAge] = useState(user?.user?.age);
  const [gender, setGender] = useState(user?.user?.gender);
  const [mobile, setMobile] = useState(user?.user?.mobile);

  const [address, setAddress] = useState(user?.user?.address);

  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          mobile,
          address,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res?.data?.data));
    } catch (err) {
      setError(err?.data?.message);
    }
  };

  return (
    <div>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Login</legend>

        <label className="label">Email</label>
        <input type="email" className="input" placeholder="Email" />

        <label className="label">Password</label>
        <input type="password" className="input" placeholder="Password" />

        <button className="btn btn-neutral mt-4">Login</button>
      </fieldset>
    </div>
  );
};

export default EditProfile;
