import React, { useState, useEffect } from 'react';

const OrdersList = () => {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:3000/orders');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (!data.orders || !Array.isArray(data.orders)) {
          console.error('Expected an array of orders, but received:', data);
          return;
        }

        setOrders(data.orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h1>Orders List</h1>
      {orders ? (
        <ul>
          {orders.map((order) => (
            <li key={order._id}>
              <p>Order ID: {order._id}</p>
              {/* <p>User ID: {order.user}</p> */}
              {/* <p>Delivery Type: {order.deliveryType}</p> */}
              <p>Time: {order.time}</p>

              <h2>Menu Items Info</h2>
              <ul>
                {Array.isArray(order.menuItemsInfo) &&
                  order.menuItemsInfo.map((menuInfo) => (
                    <li key={menuInfo.id}>
                      {/* <p>Item ID: {menuInfo.id}</p> */}
                      <p>Name: {menuInfo.name}</p>
                      <p>Quantity: {menuInfo.quantity}</p>
                    </li>
                  ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading orders...</p>
      )}
    </div>
  );
};

export default OrdersList;
