import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BrandSelector from './BrandSelector';
import ModelSelector from './ModelSelector';
import { useSellContext } from '../context/sellContext'; // Import SellContext và hook useSellContext
import { brands } from '../data/mockData';
import "./style/WatchForm.css";

export default function WatchForm() {
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const navigate = useNavigate();
  const { updateWatchForm } = useSellContext(); // Sử dụng hook để truy cập updateWatchForm từ SellContext

  const handleSelectBrand = (brand) => {
    setSelectedBrand(brand);
    setSelectedModel(null); // Reset model selection when brand changes
  };

  const handleSelectModel = (model) => {
    setSelectedModel(model); // Cập nhật thông tin mẫu đã chọn
  };

  const handleBackToBrandSelection = () => {
    setSelectedBrand(null);
  };

  const handleFormSubmit = () => {
    if (selectedBrand && selectedModel) {
        // Cập nhật thông tin sản phẩm vào context
        updateWatchForm({ brand: selectedBrand, model: selectedModel });
        console.log("Updated watchForm:", { brand: selectedBrand, model: selectedModel });
        // Chuyển hướng người dùng đến trang sell
        navigate('/sellPage');
    } else {
        // Xử lý khi người dùng chưa chọn đủ thông tin
    }
};


  return (
    <div>
      {!selectedBrand ? (
        <BrandSelector brands={brands} onSelectBrand={handleSelectBrand} />
      ) : (
        <div className='select-form'>
          <button onClick={handleBackToBrandSelection}>Back to brands</button>
          <ModelSelector brand={selectedBrand} onSelectModel={handleSelectModel} />
        </div>
      )}
      {selectedModel && (
        <div >
          <h3>You have selected:</h3>
          <p>Brand: {selectedBrand.name}</p>
          <p>Model: {selectedModel.name}</p>
          <img src={selectedModel.image} alt={selectedModel.name} className='image-form' />
          <p>Description: {selectedModel.description}</p>
          <button onClick={handleFormSubmit}>Submit</button> {/* Button để submit form */}
        </div>
      )}
    </div>
  );
};


