import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(3);

  const [totalPages, setTotalPages] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Fetch Orders
  const fetchOrders = async (pageNumber = 1) => {
    try {
      setIsLoading(true);
      setError("");

      const res = await axios.get(
        `${BASE_URL}/orders/my-orders?page=${pageNumber}&limit=${limit}`,
        { withCredentials: true },
      );

      setOrders(res.data.data);
      setTotalPages(res.data.totalPages);
      setTotalOrders(res.data.totalOrders);
      setPage(res.data.currentPage);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to fetch orders");
    } finally {
      setIsLoading(false);
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
  useEffect(() => {
    fetchOrders(page);
  }, [page]);

  return (
    <div className="min-h-screen bg-violet-300 py-10 rounded-2xl">
      <div className="max-w-5xl mx-auto bg-white-100 shadow-2xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-3 text-center">
          My Orders
        </h1>

        {/* Loading */}
        {isLoading && (
          <div className="text-center text-lg font-semibold">
            Loading orders...
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center text-red-600 font-semibold bg-red-100 py-2 rounded-lg">
            {error}
          </div>
        )}

        {/* No Orders */}
        {!isLoading && orders.length === 0 && !error && (
          <div className="text-center text-gray-600">
            You don’t have any orders yet.
          </div>
        )}

        {/* Orders List */}
        <div className="max-w-4xl mx-auto space-y-6">
          {orders.map((order) => {
            const activeItems = order.items.filter(
              (i) => i.status !== "CANCELLED",
            );
            return (
              <div
                key={order._id}
                className="border bg-white rounded-xl p-6 shadow-md"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Order ID: {order._id}
                  </h2>

                  <span className="text-sm md:text-lg bg-green-200 text-green-700 font-bold px-4 py-2 rounded-full">
                    {order.status || "Pending"}
                  </span>
                </div>

                <div className="mt-4 space-y-2 text-gray-700">
                  {order.items.map((item) => (
                    <div key={item._id}>
                      <p>
                        <strong>Grain:</strong> {item?.productName}
                      </p>
                      <p>
                        <strong>Quantity:</strong> {item?.quantity} kg
                      </p>
                      <p>
                        <strong>Price per Kg:</strong> ₹ {item?.pricePerUnit}
                      </p>
                      {/* 🔹 Status Badge */}
                      {item.status === "CANCELLED" && (
                        <p className="text-red-500 font-semibold mt-1">
                          Item Cancelled
                        </p>
                      )}

                      {item.status === "DELIVERED" && (
                        <p className="text-green-600 font-semibold mt-1">
                          Delivered
                        </p>
                      )}

                      {item.status !== "CANCELLED" &&
                        item.status !== "DELIVERED" && (
                          <p className="text-blue-600 font-semibold mt-1">
                            {item.status}
                          </p>
                        )}
                      {/* 🔹 Cancel Single Item */}
                      {activeItems.length > 1 &&
                        item.status !== "CANCELLED" &&
                        item.status !== "DELIVERED" && (
                          <button
                            onClick={() => cancelItem(order._id, item._id)}
                            className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 hover:shadow-[0_0_15px_rgba(239,68,68,0.6)]"
                          >
                            Cancel Item
                          </button>
                        )}
                      <span></span>
                    </div>
                  ))}
                  <p>
                    <strong>Total Amount:</strong>{" "}
                    <span className="text-red-600 font-semibold">
                      ₹ {order.totalAmount}
                    </span>
                  </p>
                  <div>
                    <p className="text-blue-500">Pay at your home </p>
                  </div>
                  <p>
                    <span>Ordered On:</span>{" "}
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                  {/* 🔹 Cancel Entire Order Button */}
                  {order.status !== "CANCELLED" &&
                    order.status !== "DELIVERED" && (
                      <div className="flex justify-center mb-4">
                        <button
                          onClick={() => cancelOrder(order._id)}
                          className="bg-red-400 text-white px-4 py-2 rounded-md hover:bg-red-600 hover:shadow-[0_0_15px_rgba(239,68,68,0.6)]"
                        >
                          Cancel Order{" "}
                        </button>
                      </div>
                    )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        {!isLoading && totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={() => setPage((prev) => prev - 1)}
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
              onClick={() => setPage((prev) => prev + 1)}
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

        {/* Total Orders Count */}
        <div className="mt-6 font-bold text-center text-gray-900">
          Total Orders: {totalOrders}
        </div>
      </div>
    </div>
  );
};

export default Orders;
