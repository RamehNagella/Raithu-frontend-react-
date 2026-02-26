import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const TrackPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${BASE_URL}/orders/my-orders?page=1&limit=10`,
        { withCredentials: true },
      );

      if (res?.data?.success) {
        setOrders(res?.data?.data);
      }
    } catch (err) {
      setError(
        err?.response?.data?.message || "Failed to fetch tracking details",
      );
    } finally {
      setLoading(false);
    }
  };
  const cancelOrder = async (orderId) => {
    try {
      await axios.patch(
        `${BASE_URL}/orders/${orderId}/cancel`,
        {},
        { withCredentials: true },
      );
      //Refetch orders after cancel
      fetchOrders();
    } catch (err) {
      alert(err?.response?.data.message || "Failed to cancel order");
    }
  };
  const cancelItem = async (orderId, itemId) => {
    try {
      await axios.patch(
        `${BASE_URL}/orders/${orderId}/items/${itemId}/cancel`,
        {},
        { withCredentials: true },
      );

      fetchOrders();
    } catch (err) {
      alert(err?.response?.data.message || "Failed to cancel item");
    }
  };
  const calculateExpectedDate = (createdAt) => {
    const orderDate = new Date(createdAt);
    orderDate.setDate(orderDate.getDate() + 5);
    return orderDate.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-lg font-semibold">Loading tracking details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-gray-600">You have no orders to track.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-500 p-8 rounded-2xl pb-28">
      <h2 className="text-2xl font-bold mb-6 text-center">Track Your Orders</h2>

      <div className="max-w-4xl mx-auto space-y-6">
        {orders.map((order) => {
          const activeItems = order.items.filter(
            (i) => i.status !== "CANCELLED",
          );
          return (
            <div
              key={order._id}
              className="bg-white shadow-md rounded-xl p-6 border"
            >
              <p className="mb-2 text-black">
                <strong>Order ID:</strong> {order._id}
              </p>

              <p className="mb-2 text-black">
                <strong>Status:</strong>{" "}
                <span
                  className={`px-3 py-1 rounded-full text-white text-sm ${
                    order.status === "DELIVERED"
                      ? "bg-green-500"
                      : order.status === "CANCELLED"
                        ? "bg-red-500"
                        : "bg-blue-500"
                  }`}
                >
                  {order.status}
                </span>
              </p>

              <p className="mb-4 text-black">
                <strong>Expected Delivery:</strong>{" "}
                <span className="text-orange-500 font-bold">
                  {calculateExpectedDate(order.createdAt)}
                </span>
              </p>
              <div>
                <span className="text-black">
                  Pay{" "}
                  <strong className="text-pink-600">
                    Rs.{order.totalAmount}
                  </strong>{" "}
                  Only{" "}
                </span>
              </div>

              <div className="border-t pt-4">
                <strong className="text-violet-600">Products:</strong>

                {order.items?.map((item) => (
                  <div
                    key={item._id}
                    className="mt-2 flex justify-between text-gray-700"
                  >
                    <strong>{item.productName}</strong>
                    <strong>{item.quantity} kg</strong>
                    {activeItems.length > 1 &&
                      item.status !== "CANCELLED" &&
                      item.status !== "DELIVERED" && (
                        <button
                          onClick={() => cancelItem(order._id, item._id)}
                          className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                        >
                          Cancel Item
                        </button>
                      )}
                  </div>
                ))}
              </div>
              {order.status !== "CANCELLED" && order.status !== "DELIVERED" && (
                <button
                  onClick={() => cancelOrder(order._id)}
                  className="bg-red-400 text-white px-4 py-2 rounded-md mt-2 hover:bg-red-600 hover:shadow-[0_0_15px_rgba(239,68,68,0.6)]"
                >
                  Cancel Order
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrackPage;
