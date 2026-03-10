import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const TrackPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 2; // number of orders per page

  useEffect(() => {
    fetchOrders();
  }, [page]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.get(
        `${BASE_URL}/orders/my-orders?page=${page}&limit=${limit}`,
        { withCredentials: true },
      );

      if (res?.data?.success) {
        setOrders(res?.data?.data || []);
        setTotalPages(res?.data?.totalPages || 1);
      }
    } catch (err) {
      setError(
        err?.response?.data?.message || "Failed to fetch tracking details",
      );
    } finally {
      setLoading(false);
    }
  };
  const nextPage = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };
  const prevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
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

  return (
    <div className="bg-gray-500 p-4 rounded-2xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Track Your Orders</h2>

      {/* Loading */}
      {loading && (
        <div className="text-center text-lg font-semibold">
          Loading tracking details...
        </div>
      )}
      {/* Error */}
      {error && (
        <div className="text-center text-red-600 font-semibold bg-red-100 py-2 rounded-lg">
          {error}
        </div>
      )}

      {/* No Orders */}
      {orders.length === 0 && !loading && !error && (
        <div className="text-center text-gray-600">
          You don’t have any orders yet.
        </div>
      )}

      <div className="max-w-2xl mx-auto space-y-4">
        {orders.map((order) => {
          const activeItems = order.items.filter(
            (i) => i.status !== "CANCELLED",
          );
          return (
            <div
              key={order._id}
              className="bg-white shadow-md rounded-xl p-4 border"
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
                    <strong>
                      {item.quantity} {item.unit}
                    </strong>
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
      {/* Pagination Controls */}
      {!loading && totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={prevPage}
            disabled={page === 1}
            className={`px-4 py-2 rounded-lg ${
              page === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
          >
            Previous
          </button>

          <span className="font-semibold">
            Page {page} of {totalPages}
          </span>

          <button
            onClick={nextPage}
            disabled={page === totalPages}
            className={`px-4 py-2 rounded-lg ${
              page === totalPages
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default TrackPage;
