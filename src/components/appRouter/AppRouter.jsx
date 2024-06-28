import React from "react";
import { Routes, Route } from "react-router-dom";
import NotFound from "../notFound/NotFound";
import SignIn from "../../pages/Signin";
import SignUp from "../../pages/SignUp";
import Home from "../../pages/Home";
import ProductDetail from "../../pages/ProductDetail";
import ContactPage from "../../pages/ContactPage";
import ProductList from "../../pages/ProductsList";
import ThankYou from "../../pages/ThankYou";
import Profile from "../../pages/Profile";
import Sell from "../../pages/Sell";
import Chat from "../../pages/Chat";
import Appraisers from "../profile/Appraisers";
import WishList from "../../pages/WishList";
import TestProductEdit from "../../pages/TestProductEdit";


export default function AppRouter() {
  return (
    <div className="w-full min-h-[80vh] flex items-start justify-center">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<TestProductEdit />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/order_completed/:id" element={<ThankYou />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/manage-product" element={<Profile />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/chat/:id" element={<Chat />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/appraisers" element={<Appraisers />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
