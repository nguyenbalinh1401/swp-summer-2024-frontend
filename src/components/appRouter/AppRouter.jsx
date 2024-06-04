import React from "react";
import { Routes, Route } from "react-router-dom";
import NotFound from "../notFound/NotFound";
import SignIn from "../../pages/Signin";
import Home from "../../pages/Home";
import ProductDetail from "../../pages/ProductDetail";

export default function AppRouter() {
  return (
    <div className="w-full min-h-[80vh] flex items-center justify-center">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/product" element={<div>Product</div>} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
