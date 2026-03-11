import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState("");

  const fetchCart = async () => {
    try {
      const res = await axios.get(BASE_URL + "/cart", {
        withCredentials: true,
      });
      // console.log(res.data?.data?.items);
      setCartItems(res.data?.data?.items || []);
    } catch (err) {
      setError(err.response?.data?.message);
    }
  };
  // console.log("cartItems", cartItems);
  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="text-black p-6">
      <h1 className="text-2xl font-bold mb-6">My Cart 🛒</h1>

      {error && <p className="text-red-500">{error}</p>}

      {cartItems?.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cartItems &&
        cartItems.map((item) => (
          <div
            key={item._id}
            className="flex items-center gap-6 border p-4 mb-4 rounded-lg shadow"
          >
            {/* <img
              src={item.productId?.photoUrl?.[0] || "photoUrl"}
              alt={item.productId.name || "Photo"}
              className="w-20 h-20 object-cover rounded"
            /> */}

            <div>
              {/* <h2 className="font-semibold text-lg">{item.productId.name}</h2> */}

              {/* <p>Price: ₹{item.productId.price}</p> */}

              <p>Quantity: {item.quantity}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CartPage;
