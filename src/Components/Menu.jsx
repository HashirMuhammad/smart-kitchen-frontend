import React, { useState, useEffect } from 'react';

const MenuComponent = () => {
  const [menuData, setMenuData] = useState([]);

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
  }, []); // The empty dependency array ensures this effect runs once when the component mounts

  return (
    <div>
      <h2>Menu</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {menuData.map((item) => (
        <div key={item._id} className="card" style={{ flex: '0 0 30%', margin: '10px' }}>
          <img src={item.imgUrl} className="card-img-top" alt={item.name} style={{ maxWidth: '100%', height: 'auto' }} />
          <div className="card-body">
            <h5 className="card-title">{item.name}</h5>
            <p className="card-text">${item.price}</p>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default MenuComponent;
