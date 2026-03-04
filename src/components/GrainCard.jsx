import React from "react";
import dafaultImage from "../assets/grain_default_image.jpg";
import { Link } from "react-router-dom";
/*
   {
        _id: '69936dfef7dbd5a1af1d725b',
        name: 'Brown Rice Organic',
        grainType: 'rice',nding grain data like this when we want graindata for single grain
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
const GrainCard = ({
  grain,
  isGetMyGrains = false,
  isDetailsMode = false,
  className = "",
}) => {
  // console.log("...card", grain);
  return (
    <div
      className={`card mx-auto transition-all duration-300 hover:shadow-xl
        ${
          isDetailsMode
            ? "w-[98%] max-w-3xl bg-green-300 bg-opacity-50 p-1 border-b-8 border-l-4 border-violet-700 text-black shadow-2xl"
            : "w-[92%] max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl bg-black/80 shadow-md p-2 border-b-4 border-l-4 border-yellow-400 rounded-2xl"

          // "w-[92%] max-w-sm md:max-w-md lg:max-w-lg shadow-md bg-black/90 border border-red-900"

          // w-[92%]
          // max-w-xs
          // sm:max-w-sm
          // md:max-w-md
          // lg:max-w-lg
          // xl:max-w-xl
          // bg-black/90
          // shadow-md
          // border border-gray-500
          // rounded-2xl"
        }
  `}
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
        <div className="flex items-center justify-between">
          <div className="text-orange-500 text-lg font-semibold">
            {" "}
            {!isDetailsMode ? (
              <>
                Price: ₹ {Number(grain.price.$numberDecimal)}/{grain.unit}{" "}
              </>
            ) : (
              <>
                <span>
                  Price: ₹ {Number(grain.price)}/{grain.unit}{" "}
                </span>
                <span className="text-secondary text-sm mx-6">
                  {" "}
                  Variety: {grain.variety}{" "}
                </span>
              </>
            )}
          </div>
        </div>
        <p>{grain.description || "This is a high- quality healthy grain"}</p>
        <div className="flex items-center justify-between">
          <p className="text-orange-400 font-semibold">
            {" "}
            In Stock: {grain.availableQuantity} {grain.unit}s
          </p>{" "}
          {isDetailsMode && (
            <span>
              {" "}
              Seller Name:
              <span className="font-semibold text-sm text-red-600">
                {grain.seller.name}
              </span>{" "}
            </span>
          )}{" "}
        </div>
        <div className="card-actions justify-end">
          {/* <Link
            to={`/grain/${grain._id}`}
            className="badge badge-outline bg-blue-500 w-24 h-10 text-white"
          >
            View Details
          </Link> */}
          {!isDetailsMode ? (
            <>
              <Link
                to={`/grain/${grain._id}`}
                className="badge badge-outline bg-blue-500 w-26 h-10 text-white font-semibold"
              >
                View Details
              </Link>
            </>
          ) : (
            <>
              <Link
                to={`/cart`}
                className="badge badge-outline bg-blue-500 w-26 h-10 text-white font-semibold"
              >
                Add To Cart
              </Link>
            </>
          )}

          {/* <button className="badge badge-outline bg-blue-500 w-24 h-10 text-white">
            View Details
          </button> */}
          <>
            {isGetMyGrains ? (
              <Link
                to={`/update-grain/${grain._id}`}
                className="badge badge-outline bg-green-500 w-24 h-10 font-semibold"
              >
                Update
              </Link>
            ) : (
              <Link
                to={`/grain/order/${grain._id}`}
                className="badge badge-outline bg-green-500 w-24 h-10 font-semibold"
              >
                Order Now
              </Link>
            )}
          </>
        </div>
        <div className="badge badge-primary font-semibold">
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
