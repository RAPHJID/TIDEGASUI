import { useEffect, useState } from "react";
import api from "../api/api";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/orders")
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Orders</h2>
      {orders.map(o => (
        <div key={o.id}>{o.customerName} - {o.totalAmount}</div>
      ))}
    </div>
  );
}

export default Orders;
