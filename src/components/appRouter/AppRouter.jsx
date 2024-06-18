import React from "react";
import { Routes, Route } from "react-router-dom";
import NotFound from "../notFound/NotFound";
import SignIn from "../../pages/Signin";
import SignUp from "../../pages/SignUp";
import Home from "../../pages/Home";
import ProductDetail from "../../pages/ProductDetail";
import SellPage from "../../components/SellPage";
import LastActionSell from "../../components/LastActionSell";
import WatchForm from "../../components/WatchForm";
import { SellProvider } from "../../context/sellContext";
import OtherBrandForm from "../OtherBrandForm";
import StaffDashboard from "../StaffDashboard";
import SellRequestDetail from "../SellRequestDetail";
import ReportPage from "../ReportPage";
import Contact from "../contact/ContactForm";
import Cart from "../../pages/Cart";
export default function AppRouter() {
  return (
    <div className="w-full min-h-[80vh] flex items-start justify-start py-24">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/product" element={<div>Product</div>} />
        <Route path="/product/:id" element={<ProductDetail />} />     
        <Route path="/staffDashboard" element={<StaffDashboard />} />
        <Route path="/sell-request/:id" element={<SellRequestDetail />} />
        <Route path="/sell-request/report/:id" element={<ReportPage />} />
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/cart" element={<Cart/>}/>
        
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