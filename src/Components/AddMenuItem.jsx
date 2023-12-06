import React, { useState } from 'react';

function AddMenuItem() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [imgUrl, setImgUrl] = useState('');

  const handleAddMenuItem = async () => {
    try {
      // Get the token from local storage
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('No token found. Please log in.');
        return;
      }

      const response = await fetch('http://localhost:3000/menu/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`, // Add the token to the Authorization header
        },
        body: JSON.stringify({
          name,
          price,
          imgUrl,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      console.log('Menu item added successfully:', data);

      // Redirect or perform other actions after adding the menu item
    } catch (error) {
      console.error('Error adding menu item:', error.message);
    }
  };

  return (
    <div>
      <h1>Add Menu Item</h1>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <br />
      <label>
        Price:
        <input type="number" value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} />
      </label>
      <br />
      <label>
        Image URL:
        <input type="text" value={imgUrl} onChange={(e) => setImgUrl(e.target.value)} />
      </label>
      <br />
      <button onClick={handleAddMenuItem}>Add Menu Item</button>
    </div>
  );
}

export default AddMenuItem;
