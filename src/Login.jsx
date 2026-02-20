import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [emailId, setEmailId] = useState("sureshsusri@gmail.com");
  const [password, setPassword] = useState("Suresh@7");

  const handleLogin = async () => {
    console.log(emailId, password);
    try {
      const res = await axios.post(
        "http://localhost:7777/login",
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        },
      );
    } catch (err) {
      console.error(err);
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

            <button
              className="btn btn-primary btn-sm px-6 mt-5 mx-auto block"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </div>
      </div>
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
