import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const reduxUser = useSelector((store) => store.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(reduxUser);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    photoUrl: "",
    age: "",
    mobile: "",
    address: {
      houseNumber: "",
      colony: "",
      village: "",
      mandal: "",
      district: "",
      state: "",
      pincode: "",
    },
  });
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState("");

  const saveProfile = async () => {
    console.log("in profile page");
    try {
      const res = await axios.patch(`${BASE_URL}/profile/edit`, formData, {
        withCredentials: true,
      });
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
      navigate("/profile");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };
  useEffect(() => {
    if (reduxUser) {
      setFormData({
        firstName: reduxUser?.firstName || "",
        lastName: reduxUser?.lastName || "",
        photoUrl: reduxUser?.photoUrl || "",
        age: reduxUser?.age || "23",
        mobile: reduxUser?.mobile || "0000000000",
        address: {
          houseNumber: reduxUser.address?.houseNumber || "",
          colony: reduxUser.address?.colony || "",
          village: reduxUser.address?.village || "",
          mandal: reduxUser.address?.mandal || "",
          district: reduxUser.address?.district || "",
          state: reduxUser.address?.state || "",
          pincode: reduxUser.address?.pincode || "",
        },
      });
    }
  }, [reduxUser]);

  // handle fileds values
  const handleFieldChange = (e) => {
    const { name, value } = e.target;

    if (name in formData.address) {
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [name]: value },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  return (
    <div>
      {/* Loading */}
      {!reduxUser && (
        <div className="text-center text-lg text-gray-700 font-semibold">
          Loading Profile...
        </div>
      )}
      {error && (
        <div className="text-center text-red-600 font-semibold bg-red-100 py-2 rounded-lg">
          😕 {error}
        </div>
      )}
      <div className="bg-violet-300 p-2 rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-0 text-center">
          Edit Profile
        </h1>
      </div>
      <div className="min-h-[calc(100vh-6rem)] text-violet-100 text-xl font-semibold flex justify-center items-start bg-base-200 px-2 bg-violet-300 rounded-xl">
        <fieldset className="fieldset bg-base-300 border-base-600 rounded-box w-full border p-12">
          <label className="label">First Name</label>
          <input
            name="firstName"
            type="string"
            className="input"
            placeholder="First Name"
            maxLength={20}
            value={formData.firstName}
            onChange={handleFieldChange}
          />
          <label className="label">Last Name </label>
          <input
            name="lastName"
            type="string"
            className="input"
            placeholder="Last Name"
            maxLength={20}
            value={formData.lastName}
            onChange={handleFieldChange}
          />
          <label className="label">Your Photo </label>
          <input
            name="photoUrl"
            className="input"
            placeholder="Photo Url"
            value={formData.photoUrl}
            onChange={handleFieldChange}
          />
          <label className="label">Age</label>
          <input
            name="age"
            type="string"
            className="input"
            placeholder="Age"
            value={formData.age}
            onChange={handleFieldChange}
          />
          <label className="label">Mobile </label>
          <input
            name="mobile"
            type="string"
            className="input"
            placeholder="mobile number"
            inputMode="numeric"
            maxLength={10}
            value={formData.mobile}
            onChange={handleFieldChange}
          />
          <label className="label">House Number</label>
          <input
            name="houseNumber"
            type="string"
            className="input"
            placeholder="House Number"
            maxLength={15}
            value={formData.address.houseNumber}
            onChange={handleFieldChange}
          />
          <label className="label">Colony </label>
          <input
            name="colony"
            type="string"
            className="input"
            placeholder="colony"
            maxLength={20}
            value={formData.address.colony}
            onChange={handleFieldChange}
          />
          <label className="label"> Village</label>
          <input
            name="village"
            type="string"
            className="input"
            placeholder="Village"
            maxLength={20}
            value={formData.address.village}
            onChange={handleFieldChange}
          />
          <label className="label">Mandal </label>
          <input
            name="mandal"
            type="string"
            className="input"
            placeholder="Mandal"
            maxLength={20}
            value={formData.address.mandal}
            onChange={handleFieldChange}
          />
          <label className="label">District</label>
          <input
            name="district"
            type="string"
            className="input"
            placeholder="District"
            maxLength={20}
            value={formData.address.district}
            onChange={handleFieldChange}
          />
          <label className="label">State </label>
          <input
            name="state"
            type="string"
            className="input"
            placeholder="state"
            maxLength={20}
            value={formData.address.state}
            onChange={handleFieldChange}
          />
          <label className="label">Pin Code </label>
          <input
            name="pincode"
            type="number"
            className="input"
            placeholder="pincode"
            maxLength={6}
            value={formData.address.pincode}
            onInput={(e) => {
              if (e.target.value.length > 6) {
                e.target.value = e.target.value.slice(0, 6);
              }
            }}
            onChange={handleFieldChange}
          />
          <button onClick={saveProfile} className="btn btn-neutral mt-4">
            Save Profile
          </button>
        </fieldset>
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div
            className="alert alert-success"
            name="showToast"
            value={showToast}
          >
            <span className="text-semibold text-red">
              {" "}
              ✨ Your Profile updated successfully
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
/*
import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";

const EditProfile = () => {
  // get the userdata from get api
  // provide profile update form in the UI AND read the all value
  // take the values from forms and set to the state
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  console.log("user", user);

  console.log("EditProfile", user.user);

  const [firstName, setFirstName] = useState(user?.user?.firstName || "");
  const [lastName, setLastName] = useState(user?.user?.lastName || "");

  const [photoUrl, setPhotoUrl] = useState(user?.user?.photoUrl || "");
  const [age, setAge] = useState(user?.user?.age || "");
  const [showToast, setShowToast] = useState(false);
  const [mobile, setMobile] = useState(user?.user?.mobile || "");
  const [address, setAddress] = useState({
    houseNumber: user?.user?.address?.houseNumber || "",
    colony: user?.user?.address?.colony || "",
    village: user?.user?.address?.village || "",
    mandal: user?.user?.address?.mandal || "",
    district: user?.user?.address?.district || "",
    state: user?.user?.address?.state || "",
    pincode: user?.user?.address?.pincode || "",
  });

  const [error, setError] = useState("");

  const handleFieldChange = (e) => {
    const { name, value } = e.target;

    if (name === "firstName") setFirstName(value);
    if (name === "lastName") setLastName(value);
    if (name === "photoUrl") setPhotoUrl(value);
    if (name === "age") setAge(value);
    if (name === "mobile") setMobile(value);
  };
  const addressHandler = (e) => {
    const { name, value } = e.target;

    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        `${BASE_URL}"/profile/edit"`,
        {
          firstName,
          lastName,
          photoUrl,
          age,
          mobile,
          address,
        },
        { withCredentials: true },
      );
      console.log(res.data.message);
      console.log("res:", res);

      console.log("Response Data:", res.data.data);
      dispatch(addUser(res?.data?.data));

      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div>
      {error && (
        <div className="text-center text-red-600 font-semibold bg-red-100 py-2 rounded-lg">
          😕 {error}
        </div>
      )}

      <div className="min-h-[calc(100vh-6rem)] flex justify-center items-start bg-base-200 px-4 pt-6">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
          <legend className="fieldset-legend w-full text-center">
            Edit Profile
          </legend>
          <label className="label">First Name</label>
          <input
            name="firstName"
            type="string"
            className="input"
            placeholder="First Name"
            maxLength={20}
            value={firstName}
            onChange={handleFieldChange}
          />
          <label className="label">Last Name </label>
          <input
            name="lastName"
            type="string"
            className="input"
            placeholder="Last Name"
            maxLength={20}
            value={lastName}
            onChange={handleFieldChange}
          />
          <label className="label">Your Photo </label>
          <input
            name="photoUrl"
            className="input"
            placeholder="Photo Url"
            value={photoUrl}
            onChange={handleFieldChange}
          />
          <label className="label">Age</label>
          <input
            name="age"
            type="string"
            className="input"
            placeholder="Age"
            value={age}
            onChange={handleFieldChange}
          />
          <label className="label">Mobile </label>
          <input
            name="mobile"
            type="string"
            className="input"
            placeholder="mobile number"
            inputMode="numeric"
            maxLength={10}
            value={mobile}
            onChange={handleFieldChange}
          />
          <label className="label">House Number</label>
          <input
            name="houseNumber"
            type="string"
            className="input"
            placeholder="House Number"
            maxLength={15}
            value={address.houseNumber}
            onChange={addressHandler}
          />
          <label className="label">Colony </label>
          <input
            name="colony"
            type="string"
            className="input"
            placeholder="colony"
            maxLength={20}
            value={address.colony}
            onChange={addressHandler}
          />
          <label className="label"> Village</label>
          <input
            name="village"
            type="string"
            className="input"
            placeholder="Village"
            maxLength={20}
            value={address.village}
            onChange={addressHandler}
          />
          <label className="label">Mandal </label>
          <input
            name="mandal"
            type="string"
            className="input"
            placeholder="Mandal"
            maxLength={20}
            value={address.mandal}
            onChange={addressHandler}
          />
          <label className="label">District</label>
          <input
            name="district"
            type="string"
            className="input"
            placeholder="District"
            maxLength={20}
            value={address.district}
            onChange={addressHandler}
          />
          <label className="label">State </label>
          <input
            name="state"
            type="string"
            className="input"
            placeholder="state"
            maxLength={20}
            value={address.state}
            onChange={addressHandler}
          />
          <label className="label">Pin Code </label>
          <input
            name="pincode"
            type="number"
            className="input"
            placeholder="pincode"
            maxLength={6}
            value={address.pincode}
            onInput={(e) => {
              if (e.target.value.length > 6) {
                e.target.value = e.target.value.slice(0, 6);
              }
            }}
            onChange={addressHandler}
          />
          <button onClick={saveProfile} className="btn btn-neutral mt-4">
            Save Profile
          </button>
        </fieldset>
        {showToast && (
          <>
          //   { <div
          //   className={`toast toast-top toast-center transition-all duration-500 ${
          //     showToast
          //       ? "opacity-100 translate-y-0"
          //       : "opacity-0 -translate-y-5 pointer-events-none"
          //   }`}
          // > }
            <div className="toast toast-top toast-center">
              <div
                className="alert alert-success"
                name="showToast"
                value={showToast}
              >
                <span className="text-semibold">
                  {" "}
                  ✨ Your Profile updated successfully
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EditProfile;
*/
