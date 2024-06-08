import React from "react";
import { Routes, Route } from "react-router-dom";
import NotFound from "../notFound/NotFound";
import SignIn from "../../pages/Signin";
import Home from "../../pages/Home";
import ProductDetail from "../../pages/ProductDetail";
// check sell
import SellPage from "../../components/SellPage";

import LastActionSell from "../../components/LastActionSell";
import WatchForm from "../../components/WatchForm";
import { SellProvider } from "../../context/sellContext";




export default function AppRouter() {
  return (
    <div className="w-full min-h-[80vh] flex items-center justify-center">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/product" element={<div>Product</div>} />
        <Route path="/product/:id" element={<ProductDetail />} />
        
    
    {/* check sell */}
    <Route
          path="/sell"
          element={
            <SellProvider>
              <SellPage />
            </SellProvider>
          }
        />

        <Route
          path="/WatchForm"
          element={
            <SellProvider>
              <WatchForm />
            </SellProvider>
          }
        />

        <Route
          path="/lastAction"
          element={
            <SellProvider>
              <LastActionSell />
            </SellProvider>
          }
        />
        </Routes>
    </div>
  );
}
