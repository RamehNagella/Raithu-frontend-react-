import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateFeedQuantity } from "../utils/feedSlice";
import LoginCard from "../components/AuthorizeCard";
import { BASE_URL } from "../utils/constants";

const Order = () => {
  // console.log("from view Details page ");
  const { grainId } = useParams();
  // console.log("by ViewDetails", grainId);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  // console.log(user?.user?.emailId);
  const isLoggedIn = !!user?.user?.emailId;
  // console.log(isLoggedIn);
  const [grain, setGrain] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ✅ Fetch grain details
  useEffect(() => {
    const fetchGrain = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/grain/${grainId}`, {
          withCredentials: true,
        });
        setGrain(res?.data?.data);
      } catch (err) {
        setError("Failed to load grain details");
      }
    };

    fetchGrain();
  }, [grainId]);

  // ✅ Handle order placement
  const handlePlaceOrder = async () => {
    if (quantity > grain.availableQuantity) {
      setError("Not enough stock available");
      return;
    }

    try {
      setIsLoading(true);
      setError("");
      setSuccess("");
      //update UI(values of fields) immediately after placing the order

      await axios.post(
        `${BASE_URL}/orders/place-order`,
        {
          items: [
            {
              productId: grainId,
              quantity: quantity,
              unit: grain.unit,
            },
          ],
        },
        { withCredentials: true },
      );

      setSuccess("Order placed successfully!");
      dispatch(updateFeedQuantity({ grainId, quantity }));
      // // redirect after 2 seconds
      setTimeout(() => {
        navigate("/orders");
      }, 2000);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to place order");
    } finally {
      setIsLoading(false);
    }
  };
  // if (!isLoggedIn) {
  //   return (
  //     <div className="flex items-center justify-center px-4">
  //       <div className="bg-green-200/70 shadow-xl rounded-2xl p-6 text-center w-full max-w-sm">
  //         <h2 className="text-lg text-gray-900 font-semibold mb-4">
  //           🔐 Please Login to Order Now with 🔑
  //         </h2>
  //         <button
  //           className="btn btn-secondary w-full"
  //           onClick={() => navigate("/login")}
  //         >
  //           <p className="text-green-900 font-semibold text-xl ">Login</p>
  //         </button>
  //       </div>
  //     </div>
  //   );

  if (!isLoggedIn) {
    return (
      <div>
        <LoginCard errorMessage=" 🔐 Please Login to Order Now with 🔑" />
      </div>
    );
  }

  if (!grain) {
    return (
      <div className="text-center mt-10 text-gray-700 text-lg font-semibold">
        Loading grain details...
      </div>
    );
  }

  const totalPrice = grain.price * quantity;

  return (
    <div className="flex justify-center items-end pb-[5%]  min-h-screen">
      <div className="w-full max-w-2xl h-dvh bg-gray-300 shadow-xl rounded-2xl p-4 overflow-auto">
        <h1 className="text-2xl font-bold mb-8 text-center text-gray-800">
          Order Summary
        </h1>
        {/* Grain Info */}
        <div className="flex flex-col md:flex-row gap-2 items-center">
          <img
            src={grain?.photo?.[0]}
            alt={grain.name}
            className="w-48 h-52 object-cover rounded-xl border"
          />

          <div className="flex flex-col justify-between flex-1">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                {grain.name}
              </h2>
              <p className="text-sm text-black">
                Grain Type: {grain.grainType}
              </p>

              <p className="text-gray-600 mt-3 leading-relaxed">
                {grain.description}
              </p>

              <p className="text-xl font-bold mt-4 text-green-700">
                ₹ {grain.price} / {grain.unit}
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="mt-6">
              <label className="font-semibold text-gray-700">
                Quantity ({grain.unit}):
              </label>
              {/* <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="ml-4 border border-gray-300 rounded-lg px-3 py-2 w-24 focus:outline-none focus:ring-2 focus:ring-green-500"
              /> */}
            </div>
            <div className="flex items-center">
              <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden shadow-sm bg-gray-300">
                {/* Decrease Button */}
                <button
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  disabled={quantity <= 1}
                  className="w-10 h-10 flex items-center justify-center text-lg font-medium text-gray-600 hover:bg-gray-100 active:scale-95 transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  −
                </button>

                {/* Input */}
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (value >= 1) setQuantity(value);
                  }}
                  className="w-14 h-10 text-center text-sm font-medium border-l border-r border-gray-300 focus:outline-none"
                />

                {/* Increase Button */}
                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="w-10 h-10 flex items-center justify-center text-lg font-medium text-gray-600 hover:bg-gray-100 active:scale-95 transition"
                >
                  +
                </button>
              </div>
            </div>
            {/* Total Price */}
            <div className="mt-6 text-xl font-bold text-gray-800">
              Total: <span className="text-green-600">₹ {totalPrice}</span>
            </div>
            <div className="text-lg font-bold text-red-600 ">
              {" "}
              Cash On Delivery Only
            </div>
          </div>
        </div>
        {/* Error */}
        {error && (
          <div className="mt-6 text-red-600 font-semibold text-center bg-red-100 py-2 rounded-lg">
            {error}
          </div>
        )}
        {/* Success */}
        {success && (
          <div className="mt-6 text-green-700 font-semibold text-center bg-green-100 py-2 rounded-lg">
            {success}
          </div>
        )}
        {/* Place Order Button */}
        <div className="mt-8 text-center">
          <button
            onClick={handlePlaceOrder}
            disabled={isLoading}
            className={`px-8 py-3 rounded-xl text-white font-semibold text-lg transition-all duration-300 ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {isLoading ? "Placing Order..." : "Confirm Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Order;
