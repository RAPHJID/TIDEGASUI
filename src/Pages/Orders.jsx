import { useEffect, useState } from "react";
import api from "../api/api";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [totalPrice, setTotalPrice] = useState("");

  const loadOrders = () => {
    api.get("/Order")
      .then(res => setOrders(res.data));
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const createOrder = async () => {
    await api.post("/Order", {
      customerName,
      totalPrice
    });

    setCustomerName("");
    setTotalPrice("");
    loadOrders();
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>Create Order</h2>

      <input
        placeholder="Customer Name"
        value={customerName}
        onChange={e => setCustomerName(e.target.value)}
      />

      <input
        placeholder="Total Price"
        type="number"
        value={totalPrice}
        onChange={e => setTotalPrice(e.target.value)}
      />

      <button onClick={createOrder}>Create</button>

      <hr />

      <h2>Orders</h2>
      {orders.map(o => (
        <div key={o.id}>
          {o.customerName} - {o.totalPrice}
        </div>
      ))}
    </div>
  );
}

export default Orders;
