import React, { useState } from 'react';
import '../styles/watch-form.css';


const BrandSelector = ({ brands, onSelectBrand, updateWatchForm, navigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredBrand, setHoveredBrand] = useState(null);


  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const filteredBrands = brands.filter(brand =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOtherBrandForm = () => {
    
    // Chuyển hướng người dùng đến trang "sell"
    navigate('/OtherBrandForm');
  };

  const handleMouseEnter = (brand) => {
    setHoveredBrand(brand);
  };

  const handleMouseLeave = () => {
    setHoveredBrand(null);
  };

  return (
    <div className="brand-selector-container">
      <h2 className="brand-selector-heading">Search your watch brand</h2>
      <div className="brand-selector-search">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          className="brand-selector-input"
        />
      </div>
      <div className="brand-selector-grid">
        {filteredBrands.map((brand, index) => (
          <div 
            key={index} 
            onClick={() => onSelectBrand(brand)} 
            onMouseEnter={() => handleMouseEnter(brand)} 
            onMouseLeave={handleMouseLeave} 
            className="brand-selector-card"
          >
            <img 
              src={brand.logo} 
              alt={brand.name} 
              className="brand-selector-image" 
            />
            <div className="brand-selector-details">
              <h3 className="brand-selector-name">{brand.name}</h3>
              {hoveredBrand === brand && (
                <div className="brand-selector-info">
                  <svg className="info-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                  <span className="info-text">More info about {brand.name}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="brand-selector-button">
        <button className="brand-selector-dont-know" onClick={handleOtherBrandForm}>
          Don't know
        </button>
      </div>
    </div>
  );
};

export default BrandSelector;
