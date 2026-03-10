import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import GrainForm from "./GrainForm";
import LoginCard from "./AuthorizeCard";
import { addGrain } from "../utils/feedSlice";

const AddGrains = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  // console.log(">.>//", user.user);
  const isLoggedIn = !!user?.user?.emailId;
  // console.log("11``1", isLoggedIn);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isLoggedIn) {
    return (
      <div>
        <LoginCard errorMessage="🔓 Please Login to Sell your Grain" />
      </div>
    );
  }
  const handleAddGrain = async (formData) => {
    setError("");

    // Trim strings
    const cleanedData = {
      ...formData,
      name: formData.name.trim(),
      grainType: formData.grainType.trim(),
      variety: formData.variety.trim(),
      description: formData.description.trim(),
    };

    // Basic frontend validation
    if (
      !cleanedData.name ||
      !cleanedData.grainType ||
      !cleanedData.variety ||
      !cleanedData.price ||
      !cleanedData.availableQuantity ||
      !cleanedData.photo ||
      !cleanedData.unit ||
      !cleanedData.description
    ) {
      return setError("Please fill all required fields");
    }
    try {
      setLoading(true);

      const res = await axios.post(
        `${BASE_URL}/grain/add`,
        {
          ...formData,
          photo: [
            {
              url: formData.photo,
              source: "web",
            },
          ],
        },
        { withCredentials: true },
      );
      // console.log("true");
      dispatch(addGrain(res.data?.data)); //update redux store
      navigate("/grain");
    } catch (err) {
      setError(err.response?.data || "Please Try after some time.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <GrainForm
      onSubmit={handleAddGrain}
      loading={loading}
      error={error}
      submitButtonText="Add Grain"
      isUpdateMode={false}
    />
  );
};

export default AddGrains;

/*
// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { BASE_URL } from "../utils/constants";

// const AddGrains = () => {
//   const navigate = useNavigate();
//   const user = useSelector((store) => store.user);
//   const isLoggedIn = !!user?.user?._id;

//   const [formData, setFormData] = useState({
//     name: "",
//     grainType: "",
//     variety: "",
//     description: "",
//     price: "",
//     unit: "kg",
//     availableQuantity: "",
//     photo: "",
//     qualityGrade: "",
//     harvestDate: "",
//     isOrganic: false,
//   });

//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   // ✅ NEW STATE FOR IMAGE
//   const [preview, setPreview] = useState(null);
//   const [uploading, setUploading] = useState(false);

//   // ✅ NEW FUNCTION FOR MOBILE IMAGE UPLOAD
//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setPreview(URL.createObjectURL(file));
//     setUploading(true);

//     const data = new FormData();
//     data.append("file", file);
//     data.append("upload_preset", "YOUR_UNSIGNED_UPLOAD_PRESET");

//     try {
//       const res = await fetch(
//         "https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload",
//         {
//           method: "POST",
//           body: data,
//         },
//       );

//       const result = await res.json();

//       setFormData((prev) => ({
//         ...prev,
//         photo: result.secure_url,
//       }));
//     } catch (err) {
//       setError("Image upload failed");
//     } finally {
//       setUploading(false);
//     }
//   };

//   if (!isLoggedIn) {
//     return (
//       <div className="flex items-center justify-center px-4">
//         <div className="bg-green-200/70 shadow-xl rounded-2xl p-6 text-center w-full max-w-sm">
//           <h2 className="text-lg text-gray-900 font-semibold mb-4">
//             Please provide your details by logging to sell grain
//           </h2>
//           <button
//             className="btn btn-secondary w-full"
//             onClick={() => navigate("/login")}
//           >
//             <p className="text-green-900 font-semibold text-xl ">Login</p>
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     const cleanedData = {
//       ...formData,
//       name: formData.name.trim(),
//       grainType: formData.grainType.trim(),
//       variety: formData.variety.trim(),
//       description: formData.description.trim(),
//     };

//     if (
//       !cleanedData.name ||
//       !cleanedData.grainType ||
//       !cleanedData.variety ||
//       !cleanedData.price ||
//       !cleanedData.availableQuantity ||
//       !cleanedData.photo ||
//       !cleanedData.unit ||
//       !cleanedData.description ||
//       !cleanedData.isOrganic
//     ) {
//       return setError("Please fill all required fields");
//     }

//     try {
//       setLoading(true);

//       await axios.post(
//         `${BASE_URL}/grain/add`,
//         {
//           ...cleanedData,
//           photo: [
//             {
//               url: cleanedData.photo,
//               source: "web",
//             },
//           ],
//         },
//         { withCredentials: true },
//       );

//       navigate("/feed");
//     } catch (err) {
//       setError(err.response?.data || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="px-6 py-6 bg-gray-700 rounded-3xl">
//       <div className="max-w-md mx-auto bg-gray-200 shadow-xl rounded-2xl p-5">
//         <h1 className="text-2xl font-bold text-center mb-6 text-blue-900">
//           Add Grain Product
//         </h1>

//         {error && <div className="alert alert-error mb-4 text-sm">{error}</div>}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             name="name"
//             placeholder="Grain Name *"
//             className="input input-bordered w-full"
//             onChange={handleChange}
//           />
//           <select
//             name="grainType"
//             className="select select-bordered w-full"
//             onChange={handleChange}
//           >
//             <option value="Rice">Rice</option>
//             <option value="Wheat">Wheat</option>
//             <option value="<Millets">Millets</option>
//           </select>

//           <input
//             name="price"
//             type="number"
//             placeholder="Price per kg/Quintal/Ton *"
//             className="input input-bordered w-full"
//             onChange={handleChange}
//           />

//           <input
//             name="availableQuantity"
//             type="number"
//             placeholder="Avail. Quantity in Kg/Quintal/Tons *"
//             className="input input-bordered w-full"
//             onChange={handleChange}
//           />
//           <select
//             name="unit"
//             className="select select-bordered w-full"
//             onChange={handleChange}
//           >
//             <option value="kg">Kg</option>
//             <option value="quintal">quintal</option>
//             <option value="ton">ton</option>
//           </select>

//           //{/ ✅ REPLACED photo input WITH MOBILE UPLOAD /}
//           <input
//             name="photo"
//             type="file"
//             accept="image/*"
//             capture="environment"
//             className="file-input file-input-bordered w-full"
//             onChange={handleImageUpload}
//           />

//           //{/ ✅ IMAGE PREVIEW /}
//           {preview && (
//             <img
//               src={preview}
//               alt="preview"
//               className="rounded-xl w-40 h-20 object-cover"
//             />
//           )}

//           {uploading && (
//             <p className="text-sm text-blue-700">Uploading image...</p>
//           )}

//           <label className="flex items-center gap-2 text-gray-900">
//             <input
//               type="checkbox"
//               name="isOrganic"
//               className="checkbox checkbocx-success border-2 border-green-700 bg-white"
//               onChange={handleChange}
//             />
//             Organic
//           </label>

//           <textarea
//             name="description"
//             placeholder="Description (Required)"
//             className="textarea textarea-bordered w-full"
//             rows="2"
//             onChange={handleChange}
//           />

//           <input
//             name="harvestDate"
//             placeholder="Harvest Date*"
//             className="input input-bordered w-full"
//             onChange={handleChange}
//           />

//           <button
//             type="submit"
//             disabled={uploading}
//             className={`btn btn-secondary w-full font-bold text-green-900 ${
//               loading ? "btn-disabled" : ""
//             }`}
//           >
//             {loading ? "Adding..." : "Add Grain"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddGrains;
*/
