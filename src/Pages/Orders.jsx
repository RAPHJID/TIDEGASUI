import { useEffect, useState } from "react";
import api from "../api/api";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/orders")
      .then(res => setOrders(res.data))
      .catch(() => alert("Failed to load orders"));
  }, []);

  return (
    <div style={{ padding: 30 }}>
      <h2>Orders</h2>

      {orders.map(o => (
        <div key={o.id}>
          {o.customerName} - {o.totalAmount}
        </div>
      ))}
    </div>
  );
}

export default Orders;
