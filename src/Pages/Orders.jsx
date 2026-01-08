import { useEffect, useState } from "react";
import api from "../api/api";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [inventories, setInventories] = useState([]);

  const [inventoryId, setInventoryId] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [totalPrice, setTotalPrice] = useState("");

  const loadOrders = () => {
    api.get("/Order").then(res => setOrders(res.data));
  };

  const loadInventories = () => {
    api.get("/inventory").then(res => setInventories(res.data));
  };

  useEffect(() => {
    loadOrders();
    loadInventories();
  }, []);

  const createOrder = async () => {
    try {
      await api.post("/Order", {
        inventoryId,
        customerName,
        totalPrice: parseFloat(totalPrice)
      });

      setInventoryId("");
      setCustomerName("");
      setTotalPrice("");
      loadOrders();
    } catch (err) {
      alert(err.response?.data || "Failed to create order");
    }
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>Create Order</h2>

      <select value={inventoryId} onChange={e => setInventoryId(e.target.value)}>
        <option value="">Select Cylinder</option>
        {inventories.map(i => (
          <option key={i.id} value={i.id}>
            {i.name}
          </option>
        ))}
      </select>

      <br /><br />

      <input
        placeholder="Customer Name"
        value={customerName}
        onChange={e => setCustomerName(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Total Price"
        type="number"
        value={totalPrice}
        onChange={e => setTotalPrice(e.target.value)}
      />

      <br /><br />

      <button onClick={createOrder}>Create Order</button>

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
