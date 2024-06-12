import React, { useState } from 'react';
import "./style/BrandSelectorStyle.css";
export default function BrandSelector({ brands, onSelectBrand, updateWatchForm, navigate })  {
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
    <div className='brand-form'>
      <h2 className='h2'>Search your watch brand:</h2>
      <div className='search-form'>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          className='input-form'
        />
      </div>
      <div className='logo-form'>
        {filteredBrands.map((brand, index) => (
          <div key={index} onClick={() => onSelectBrand(brand)} className='onclick-form'>
            <img src={brand.logo} alt={brand.name} className='image-form' />
            <p>{brand.name}</p>
          </div>
        ))}
      </div>
      <button onClick={handleNullForm}>Don't know</button>
    </div>
  );
};


