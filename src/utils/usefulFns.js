export const cancelOrder = async (orderId) => {
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
export const cancelItem = async (orderId, itemId) => {
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
