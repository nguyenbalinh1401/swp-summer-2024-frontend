import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import BrandSelector from './BrandSelector';
import ModelSelector from './ModelSelector';
import { useSellContext } from '../context/sellContext'; 
import { brands } from '../data/mockData';
import "../styles/watch-form.css";

const WatchForm = () => {
  const [selectedBrand, setSelectedBrand] = useState(null);
  const navigate = useNavigate();
  const { updateWatchForm } = useSellContext(); 

  const handleSelectBrand = (brand) => {
    setSelectedBrand(brand);
  };

  const handleBackToBrandSelection = () => {
    setSelectedBrand(null);
  };

  const handleFormSubmit = (model) => {
    if (selectedBrand && model) {
        updateWatchForm({ brand: selectedBrand, model });
        navigate('/sell');
    } else {
        // Xử lý khi người dùng chưa chọn đủ thông tin
        alert("Vui lòng chọn thương hiệu và mẫu đồng hồ!");
    }
  };

  return (
    <motion.div 
      className="min-h-screen flex items-center justify-center bg-gray-100"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-screen-xl w-full p-8 bg-white rounded-lg shadow-lg overflow-hidden">
        {!selectedBrand ? (
          <BrandSelector brands={brands} onSelectBrand={handleSelectBrand} />
        ) : (
          <>
            <button onClick={handleBackToBrandSelection} className="mb-4 inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Back to brands
            </button>
            <ModelSelector brand={selectedBrand} onSelectModel={handleFormSubmit} />
          </>
        )}
      </div>
    </motion.div>
  );
};

export default WatchForm;
