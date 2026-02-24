import { use, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import exploreGrainsImage from "../assets/grain_default_image2.jpg";

const Login = () => {
  const [emailId, setEmailId] = useState("sureshsusri@gmail.com");
  const [password, setPassword] = useState("Suresh@7");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((store) => store.user);
  const isLoggedIn = !!user?.emailId;

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

  return (
    <div className="min-h-[calc(100vh-6rem)] flex justify-center items-start bg-base-200 px-4 pt-16">
      <div className="w-full max-w-md">
        <div className="card bg-base-300 shadow-xl">
          <div className="card-body space-y-4">
            <h2 className="card-title justify-center text-2xl font-bold">
              Login
            </h2>

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
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </div>
      </div>
      {!isLoggedIn && (
        <div className="fixed top-96 right-8 z-50">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="bg-white/25 backdrop-blur-sm rounded-2xl p-4 shadow-xl text-center">
              <img
                src={exploreGrainsImage}
                alt="Explore Grains"
                className="rounded-lg mb-4 h-20 object-cover mx-auto "
              />
              <Link
                to="/grain"
                className="block bg-green-600 text-white text-sm px-3 py-2 rounded-full"
              >
                View Grains
              </Link>
            </div>
          </div>
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
