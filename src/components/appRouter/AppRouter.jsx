import React from "react";
import { Routes, Route } from "react-router-dom";
import NotFound from "../notFound/NotFound";
import SignIn from "../../pages/Signin";
import Home from "../../pages/Home";
import ProductDetail from "../../pages/ProductDetail";
import SellPage from "../../components/SellPage";
import LastActionSell from "../../components/LastActionSell";
import WatchForm from "../../components/WatchForm";
import { SellProvider } from "../../context/sellContext";
import Buy from "../../pages/Buy";
import HomePage from "../../pages/HomePage";
import Sell from "../../pages/Sell";
import OtherBrandForm from "../OtherBrandForm";

export default function AppRouter() {
  return (
    <div className="w-full min-h-[80vh] flex items-center justify-center">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/product" element={<div>Product</div>} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/sell" element={<Sell />} />
        
        <Route 
          path="/sellPage" 
          element={
            <SellProvider>
              <SellPage />
            </SellProvider>
          } 
        />
        <Route 
          path="/LastActionSell" 
          element={
            <SellProvider>
              <LastActionSell />
            </SellProvider>
          } 
        />
        <Route 
          path="/watchForm" 
          element={
            <SellProvider>
              <WatchForm />
            </SellProvider>
          } 
        />
        <Route 
          path="/OtherBrandForm" 
          element={
            <SellProvider>
              <OtherBrandForm />
            </SellProvider>
          } 
        />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
