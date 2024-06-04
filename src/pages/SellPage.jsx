import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../styles/sell-page.css";

function SellPage() {
  const brands = [
    { id: 1, name: "Brand 1", products: ["Product 1A", "Product 1B", "Product 1C"] },
    { id: 2, name: "Brand 2", products: ["Product 2A", "Product 2B", "Product 2C"] },
    { id: 3, name: "Brand 3", products: ["Product 3A", "Product 3B", "Product 3C"] },
    { id: 4, name: "Brand 4", products: ["Product 4A", "Product 4B", "Product 4C"] },
    { id: 5, name: "Brand 5", products: ["Product 5A", "Product 5B", "Product 5C"] }
  ];

  const [selectedBrand, setSelectedBrand] = useState(null);

  const openModal = (brand) => {
    setSelectedBrand(brand);
  };

  const closeModal = () => {
    setSelectedBrand(null);
  };

  return (
    <div className="sell-page">
      <div className="search-bar">
        <label>SEARCH BY KEYWORD</label>
        <input type="text" placeholder="Enter keyword..." />
      </div>
      <p>Alternatively, select your watch by series</p>
      <div className="brand-list">
        {brands.map((brand) => (
          <div key={brand.id} className="brand" onClick={() => openModal(brand)}>
            <img src={`https://via.placeholder.com/150?text=${brand.name}`} alt={brand.name} />
          </div>
        ))}
      </div>
      {selectedBrand && (
        <div className="overlay">
          <div className="modal-content">
            <h2>{selectedBrand.name} Products</h2>
            <ul>
              {selectedBrand.products.map((product, index) => (
                <li key={index}>
                  <Link to={`/fillFormBeSell/${selectedBrand.id}/${product}`}>{product}</Link>
                </li>
              ))}
            </ul>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SellPage;
