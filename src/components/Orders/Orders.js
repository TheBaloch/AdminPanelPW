import React, { useEffect, useState } from "react";
import axios from "axios";

const DateSelector = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/orders`)
      .then((response) => {
        setOrders(response.data.orders);
        console.log(response.data.orders);
      })
      .catch((error) => {
        console.error("Error retrieving orders:", error);
      });
  }, []);

  return (
    <div>
      <h1>Orders</h1>

      {orders.map((order) => (
        <div key={order._id.$oid} className="card">
          {order.products.map((product) => (
            <div key={product._id} className="product">
              <img
                src={`${process.env.REACT_APP_API_URL}/${product.image}`}
                alt={product.name}
                style={{ height: "70px", width: "70px" }}
              />

              <h3>{product.name}</h3>
              <h3>Quantity: {product.count}</h3>
              <p>Category: {product.category}</p>
              <p>price: {product.price}Rs</p>
            </div>
          ))}
          <p>User Email: {order.user_email}</p>
          <p>User phoneNO: {order.user_phone}</p>

          <p style={{ color: "green", fontWeight: "bold" }}>
            Total Price: {order.subtotal}
          </p>
        </div>
      ))}
    </div>
  );
};

export default DateSelector;
