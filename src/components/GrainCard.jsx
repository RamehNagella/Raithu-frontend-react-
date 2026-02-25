import React from "react";
import dafaultImage from "../assets/grain_default_image.jpg";
import { Link } from "react-router-dom";
/*
   {
        _id: '69936dfef7dbd5a1af1d725b',
        name: 'Brown Rice Organic',
        grainType: 'rice',
        variety: 'Brown Basmati',
        photo: [
          {
            url: 'https://jeevaorganic.com/cdn/shop/files/Organic-Brown-Rice-Protein-Powder.jpg?v=1724243584',
            source: 'web'
          }
        ],
        price: {
          $numberDecimal: '100'
        },
        description: 'Unpolished brown basmati rice with bran intact. Rich in fiber and nutrients.',
        unit: 'kg',
        availableQuantity: 300,
        harvestDate: '2024-12-01T00:00:00.000Z',
        isOrganic: true,
        createdAt: '2026-02-16T19:20:30.276Z'
      },
   */
const GrainCard = ({ grain }) => {
  return (
    <div
      className="card
  w-[92%] 
  max-w-xs 
  sm:max-w-sm 
  md:max-w-md 
  lg:max-w-lg 
  xl:max-w-xl
  mx-auto
  bg-black/90
  shadow-md
  border border-gray-500
  rounded-2xl
  transition-all duration-300 hover:shadow-xl"
    >
      {" "}
      <figure>
        <img
          src={grain.photo?.[0]?.url || dafaultImage}
          alt={grain.name || "Grains"}
          onError={(e) => {
            e.target.src = dafaultImage;
          }}
        />
      </figure>
      <div className="card-body">
        {/* <h2 className="card-title badge badge-secondary ">
          {grain.name}
          <div className="badge badge-primary ml-2">
            {grain.isOrganic ? "Organic" : "Non-Organic"}
          </div>
        </h2> */}
        <div className="flex items-center justify-between gap-2">
          <h2 className="card-title text-lg font-bold text-violet-500 truncate flex-1">
            {grain.name}
          </h2>
          <div
            className={`badge ${grain.isOrganic ? "badge-success" : "badge-warning"} text-white font-semibold whitespace-nowrap shrink-0`}
          >
            {grain.isOrganic ? "Organic" : "Non-Organic"}
          </div>
        </div>
        <p>{grain.description || "This is a high- quality healthy grain"}</p>
        <div className="card-actions justify-end">
          {/* <Link
            to={`/grain/${grain._id}`}
            className="badge badge-outline bg-blue-500 w-24 h-10 text-white"
          >
            View Details
          </Link> */}
          <Link
            to={`/grain/${grain._id}`}
            className="badge badge-outline bg-blue-500 w-26 h-10 text-white"
          >
            View Details
          </Link>

          {/* <button className="badge badge-outline bg-blue-500 w-24 h-10 text-white">
            View Details
          </button> */}
          <Link
            to={`/grain/order/${grain._id}`}
            className="badge badge-outline bg-green-500 w-24 h-10"
          >
            Order Now
          </Link>
        </div>
        <div className="badge badge-primary">
          Harvested In{" "}
          {new Date(grain.harvestDate).toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          }) || "Unknown"}
        </div>
      </div>
    </div>
  );
};

// const GrainCard = ({ grain }) => {
//   return (
//     <div className="bg-white rounded-xl shadow-md overflow-hidden">
//       {/* Image */}
//       <img
//         src={grain.image}
//         alt={grain.name}
//         className="w-full h-48 object-cover"
//       />

//       {/* Content */}
//       <div className="p-4">
//         <h2 className="text-lg font-semibold text-gray-800">{grain.name}</h2>

//         <p className="text-sm text-gray-500 mt-1">{grain.description}</p>

//         <div className="mt-3 flex justify-between items-center">
//           <span className="text-lg font-bold text-green-600">
//             ₹{grain.price}
//           </span>

//           <button className="bg-yellow-400 px-4 py-2 rounded-lg text-sm font-medium">
//             Add
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
export default GrainCard;
