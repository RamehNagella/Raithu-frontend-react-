import { use, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import RightViewGrainCard from "./RightViewGrainCard";

const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [emailId, setEmailId] = useState("sureshsusri@gmail.com");
  const [password, setPassword] = useState("Suresh@7");

  const [error, setError] = useState("");

  const [isLoginForm, setIsLoginForm] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((store) => store.user);
  const isLoggedIn = !!user?.user?.emailId;
  console.log(user, isLoggedIn);

  const handleLogin = async () => {
    // console.log(emailId, password);

    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        },
      );
      // console.log(res.data.user);
      dispatch(addUser(res.data?.user));
      return navigate("/grain");
    } catch (err) {
      console.error(err?.response?.data?.Error);
      setError(
        err?.response?.data?.Error || "Something went wrong. Please try again.",
      );
    }
  };
  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res?.data?.data));
      return navigate("/profile");
    } catch (err) {
      setError(err.response?.data?.message);
    }
  };

  return (
    <div className="min-h-[calc(100vh-6rem)] flex justify-center items-start bg-base-200 px-4 pt-16">
      <div className="w-full max-w-md">
        <div className="card bg-base-300 shadow-xl">
          <div className="card-body space-y-4">
            <h2 className="card-title justify-center text-2xl font-bold">
              {isLoginForm ? "Login" : "Sign Up"}
            </h2>
            {isLoginForm && (
              <>
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">First Name</span>
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    className="input input-bordered w-full"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>

                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Last Name</span>
                  </div>
                  <input
                    type="text"
                    value={lastName}
                    className="input input-bordered w-full"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>
              </>
            )}

            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Email Id</span>
              </div>
              <input
                type="text"
                value={emailId}
                className="input input-bordered w-full"
                onChange={(e) => setEmailId(e.target.value)}
              />
            </label>

            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="text"
                value={password}
                className="input input-bordered w-full"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <p className="text-red-500">{error}</p>
            <button
              className="btn btn-primary btn-sm px-6 mt-5 mx-auto block"
              onClick={isLoginForm ? handleLogin : handleSignUp}
            >
              {isLoginForm ? "Login" : "Sign Up"}
            </button>
          </div>

          <p
            className="text-gray-700"
            onClick={() => setIsLoginForm((value) => !value)}
          >
            {isLoginForm
              ? "New User? Sign Up Here"
              : "Existing User? Login Here"}
          </p>
        </div>
      </div>
      {!isLoggedIn && (
        <div className="fixed bottom-20 right-4 z-50">
          <RightViewGrainCard />
        </div>
      )}
    </div>
  );
  // return (
  //   <div className="flex justify-center bg-base-200 px-4 pt-10 pb-6">
  //     <div className="w-full max-w-md">
  //       <div className="card bg-base-300 shadow-xl">
  //         <div className="card-body space-y-4">
  //           <h2 className="card-title justify-center text-2xl font-bold">
  //             Login
  //           </h2>
  //           <div className="space-y-4 mt-4">
  //             <label className="form-control w-full">
  //               <div className="label">
  //                 <span className="label-text">Email Id</span>
  //               </div>
  //               <input
  //                 type="text"
  //                 value={emailId}
  //                 className="input input-bordered w-full max-w-xs"
  //                 onChange={(e) => setEmailId(e.target.value)}
  //               />
  //             </label>
  //             <label className="form-control w-full max-w-xs my-4">
  //               <div className="label">
  //                 <span className="label-text">Password</span>
  //               </div>
  //               <input
  //                 type="text"
  //                 value={password}
  //                 className="input input-bordered w-full max-w-xs"
  //                 onChange={(e) => setPassword(e.target.value)}
  //               />
  //             </label>
  //           </div>
  //           <div className="card-actions justify-center">
  //             <button className="btn btn-primary" onClick={handleLogin}>
  //               Login
  //             </button>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default Login;
