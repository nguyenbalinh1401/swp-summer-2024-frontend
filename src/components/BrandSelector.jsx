import React, { useState } from 'react';

const BrandSelector = ({ brands, onSelectBrand, updateWatchForm, navigate }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const filteredBrands = brands.filter(brand =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNullForm = () => {
    // Đặt watchForm thành null
    updateWatchForm(null);
    // Chuyển hướng người dùng đến trang "sell"
    navigate('/sell');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h2 style={{ marginBottom: '10px' }}>Search your watch brand:</h2>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          style={{ width: '300px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {filteredBrands.map((brand, index) => (
          <div key={index} onClick={() => onSelectBrand(brand)} style={{ cursor: 'pointer', border: '2px solid black', padding: '10px', borderRadius: '5px', margin: '5px' }}>
            <img src={brand.logo} alt={brand.name} style={{ width: '100px', height: '100px' }} />
            <p>{brand.name}</p>
          </div>
        ))}
      </div>
      <button onClick={handleNullForm}>Don't know</button>
    </div>
  );
};

export default BrandSelector;
