import React, { useState, useEffect } from 'react';

const Order = () => {
  const [menuData, setMenuData] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});
  const [quantities, setQuantities] = useState({});
  const [orderDetails, setOrderDetails] = useState({
    menuIds: [],
    deliveryType: 'pickup',
  });

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await fetch('http://localhost:3000/menu');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setMenuData(data);
      } catch (error) {
        console.error('Error fetching menu data:', error);
      }
    };

    fetchMenuData();
  }, []);

  const handleItemClick = (itemId) => {
    setSelectedItems((prevSelected) => {
      const isSelected = prevSelected[itemId];
      const updatedSelection = { ...prevSelected, [itemId]: !isSelected };
      return updatedSelection;
    });
  };

  const handleQuantityChange = (itemId, quantity) => {
    setQuantities((prevQuantities) => ({ ...prevQuantities, [itemId]: quantity }));
  };

  const handleDeliveryTypeChange = (event) => {
    setOrderDetails({ ...orderDetails, deliveryType: event.target.value });
  };

  const handlePlaceOrder = async () => {
    try {
      const token = localStorage.getItem('token');

      // Construct the menuIds array with quantities
      const updatedMenuIds = Object.keys(quantities).flatMap((itemId) => {
        const menuId = itemId; // Assuming menuId is same as itemId
        const quantity = quantities[itemId];
        return Array.from({ length: quantity }, () => ({ menuId, quantity: 1 }));
      });

      const updatedOrderDetails = { ...orderDetails, menuIds: updatedMenuIds };

      const response = await fetch('http://localhost:3000/order/place', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
        body: JSON.stringify(updatedOrderDetails),
      });
      console.log(JSON.stringify(updatedOrderDetails));

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Handle successful order placement, e.g., show a success message
      console.log('Order placed successfully');
    } catch (error) {
      console.error('Error placing order:', error.message);
    }
  };

  return (
    <div>
      <h2>Menu</h2>
      <div className="menu-container">
        {menuData.map((item) => (
          <div
            key={item._id}
            className={`card ${selectedItems[item._id] ? 'selected' : ''}`}
            onClick={() => handleItemClick(item._id)}
          >
            <img
              src={item.imgUrl}
              className="card-img-top"
              alt={item.name}
            />
            <div className="card-body">
              <h5 className="card-title">{item.name}</h5>
              <p className="card-text">${item.price}</p>
              {selectedItems[item._id] && (
                <input
                  type="number"
                  min="1"
                  value={quantities[item._id] || ''}
                  onChange={(e) => handleQuantityChange(item._id, e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                />
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="order-details">
        <h2>Order Details</h2>
        <label>
          Delivery Type:
          <select value={orderDetails.deliveryType} onChange={handleDeliveryTypeChange}>
            <option value="pickup">Pickup</option>
            <option value="delivery">Delivery</option>
            <option value="dinein">Dine-in</option>
          </select>
        </label>
        <button onClick={handlePlaceOrder}>Place Order</button>
      </div>
    </div>
  );
};

export default Order;
