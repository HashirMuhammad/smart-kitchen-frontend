import React, { useState, useEffect } from 'react';

const RiderDetails = () => {
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/rider/${localStorage.getItem('orderId')}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setOrderData(data.order);
        console.log(data.order.address);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    fetchOrderDetails();
  }, []);

  return (
    <div>
      <h1>Order Details</h1>
      {orderData ? (
        <div>
          <p>Order ID: {orderData._id}</p>
          <p>User ID: {orderData.user}</p>
          <p>User Name: {orderData.userName}</p>
          <p>Delivery Type: {orderData.deliveryType}</p>
          <p>Time: {orderData.time}</p>

          {/* Display aggregated menu items info */}
          {orderData.menuItemsInfo ? (
            <div>
              <h2>Aggregated Menu Items Info</h2>
              {orderData.menuItemsInfo.map((menuItem, index) => (
                <div key={index}>
                  {/* <p>Menu Item ID: {menuItem.id}</p> */}
                  <p>Menu Item Name: {menuItem.name}</p>
                  <p>Quantity: {menuItem.quantity}</p>
                  <p>address: {orderData.address}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No menu items info available.</p>
          )}

          {/* Add more details as needed */}
        </div>
      ) : (
        <p>Loading order details..</p>
      )}
    </div>
  );
};

export default RiderDetails;
