// OrderDetails.js
import React, { useState, useEffect } from 'react';

const OrderDetails = () => {
  const [orderUpdateData, setOrderUpdateData] = useState({
    address: '',
    phoneNumber: '',
    paymentImage: '',
  });

  useEffect(() => {
    // Retrieve order ID from local storage
    const orderId = localStorage.getItem('orderId');

    // You can set orderId in the state if needed
    // setOrderUpdateData({ ...orderUpdateData, orderId });
  }, []); // Run the effect only once when the component mounts

  const handleInputChange = (e) => {
    setOrderUpdateData({
      ...orderUpdateData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setOrderUpdateData({
          ...orderUpdateData,
          paymentImage: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateOrder = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:3000/order/update/${localStorage.getItem('orderId')}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
        body: JSON.stringify(orderUpdateData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Handle successful order update, e.g., show a success message
      console.log('Order updated successfully');
    } catch (error) {
      console.error('Error updating order:', error.message);
    }
  };

  return (
    <div>
      <h1>Update Order</h1>
      <form>
        {/* orderId is removed from the input fields */}
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={orderUpdateData.address}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Phone Number:
          <input
            type="text"
            name="phoneNumber"
            value={orderUpdateData.phoneNumber}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Payment Image:
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </label>
        <br />
        <button type="button" onClick={handleUpdateOrder}>
          Update Order
        </button>
      </form>
    </div>
  );
};

export default OrderDetails;
