import { Avatar, message } from "antd";
import React, { useState } from "react";

export default function ProductDetailComponent({ product, isInWishList }) {
  const [wishListState, setWishListState] = useState(isInWishList);

  const addToFavorite = () => {
    const wishList = sessionStorage.wishList
      ? JSON.parse(sessionStorage.wishList)
      : [];
    if (wishList.length === 0) {
      sessionStorage.setItem("wishList", JSON.stringify([product]));
      message.success({
        key: "wishList",
        content: "Added to your wish list.",
        duration: 5,
      });
      setWishListState(true);
    } else {
      if (wishList.some((item) => item.id === product.id)) {
        message.info({
          key: "wishList",
          content: "Already added to your wish list.",
          duration: 5,
        });
      } else {
        wishList.push(product);
        sessionStorage.setItem("wishList", JSON.stringify(wishList));
        message.success({
          key: "wishList",
          content: "Added to your wish list.",
          duration: 5,
        });
        setWishListState(true);
      }
    }
  };

  return (
    <div className="w-full flex flex-col justify-center font-montserrat gap-4">
      <div className="w-full flex items-center justify-between">
        <img src={product.image} alt="" className="w-[400px]" />
        <div className="w-1/2 flex flex-col items-start justify-between text-xl gap-8">
          <div className="ml-4 flex flex-col gap-3">
            <p className="font-light">{product.brand}</p>
            <p className="text-[2em] font-semibold leading-[1.2em]">
              {product.name}
            </p>
            <p className="w-full text-xs text-end pr-4">
              owned by &ensp;
              <span className="opacity-70 cursor-pointer hover:opacity-100">
                <Avatar size={16} src={product.owner.avatar} />{" "}
                {product.owner.username}
              </span>
            </p>
            <p className="text-[30px] font-bold">
              $ {Math.round(product.price * 100) / 100}
            </p>
            <p className="text-[30px] font-bold">
              {isInWishList ? "true" : "false"}
            </p>
          </div>

          <div className="w-full flex flex-col gap-2">
            <button
              onClick={() => {}}
              className={`w-full flex items-center justify-center gap-2 rounded-md font-bold text-teal-700 text-sm border border-teal-700 hover:bg-slate-100 mx-auto py-3 transition-all duration-500`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="currentColor"
              >
                <path d="M2 8.99374C2 5.68349 4.67654 3 8.00066 3H15.9993C19.3134 3 22 5.69478 22 8.99374V21H8.00066C4.68659 21 2 18.3052 2 15.0063V8.99374ZM20 19V8.99374C20 6.79539 18.2049 5 15.9993 5H8.00066C5.78458 5 4 6.78458 4 8.99374V15.0063C4 17.2046 5.79512 19 8.00066 19H20ZM14 11H16V13H14V11ZM8 11H10V13H8V11Z"></path>
              </svg>
              Chat with the owner
            </button>
            {wishListState ? (
              <button
                onClick={addToFavorite}
                className="w-full flex items-center justify-center gap-2 rounded-md bg-green-500 hover:bg-green-700 font-bold text-sm text-white mx-auto py-3 duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="currentColor"
                >
                  <path d="M16.5 3C19.5376 3 22 5.5 22 9C22 16 14.5 20 12 21.5C9.5 20 2 16 2 9C2 5.5 4.5 3 7.5 3C9.35997 3 11 4 12 5C13 4 14.64 3 16.5 3ZM12.9339 18.6038C13.8155 18.0485 14.61 17.4955 15.3549 16.9029C18.3337 14.533 20 11.9435 20 9C20 6.64076 18.463 5 16.5 5C15.4241 5 14.2593 5.56911 13.4142 6.41421L12 7.82843L10.5858 6.41421C9.74068 5.56911 8.5759 5 7.5 5C5.55906 5 4 6.6565 4 9C4 11.9435 5.66627 14.533 8.64514 16.9029C9.39 17.4955 10.1845 18.0485 11.0661 18.6038C11.3646 18.7919 11.6611 18.9729 12 19.1752C12.3389 18.9729 12.6354 18.7919 12.9339 18.6038Z"></path>
                </svg>
                Added to wishlist
              </button>
            ) : (
              <button
                onClick={addToFavorite}
                className="w-full flex items-center justify-center gap-2 rounded-md bg-red-500 hover:bg-red-700 font-bold text-sm text-white mx-auto py-3 duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="currentColor"
                >
                  <path d="M16.5 3C19.5376 3 22 5.5 22 9C22 16 14.5 20 12 21.5C9.5 20 2 16 2 9C2 5.5 4.5 3 7.5 3C9.35997 3 11 4 12 5C13 4 14.64 3 16.5 3ZM12.9339 18.6038C13.8155 18.0485 14.61 17.4955 15.3549 16.9029C18.3337 14.533 20 11.9435 20 9C20 6.64076 18.463 5 16.5 5C15.4241 5 14.2593 5.56911 13.4142 6.41421L12 7.82843L10.5858 6.41421C9.74068 5.56911 8.5759 5 7.5 5C5.55906 5 4 6.6565 4 9C4 11.9435 5.66627 14.533 8.64514 16.9029C9.39 17.4955 10.1845 18.0485 11.0661 18.6038C11.3646 18.7919 11.6611 18.9729 12 19.1752C12.3389 18.9729 12.6354 18.7919 12.9339 18.6038Z"></path>
                </svg>
                Add to wishlist
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col ml-8 gap-8">
        <p className="text-2xl font-bold">SPECIFICATIONS</p>
        <div className="flex flex-wrap justify-start gap-x-4 gap-y-2 text-sm">
          <div className="flex flex-row items-center justify-between flex-[100%] sm:flex-[45%] md:flex-[30%] lg:flex-[20%]">
            <p className="font-bold">Type:</p>
            <p className="font-light">{product.type}</p>
          </div>
          <div className="flex flex-row items-center justify-between flex-[100%] sm:flex-[45%] md:flex-[30%] lg:flex-[20%]">
            <p className="font-bold">Dial color:</p>
            <p className="font-light">{product.dialColor}</p>
          </div>
          <div className="flex flex-row items-center justify-between flex-[100%] sm:flex-[45%] md:flex-[30%] lg:flex-[20%]">
            <p className="font-bold">Box:</p>
            <div className="font-light">
              <p>Yes</p>
            </div>
          </div>
          <div className="flex flex-row items-center justify-between flex-[100%] sm:flex-[45%] md:flex-[30%] lg:flex-[20%]">
            <p className="font-bold">Papers:</p>
            <div className="font-light">
              <p>Yes</p>
            </div>
          </div>
          <div className="flex flex-row items-center justify-between flex-[100%] sm:flex-[45%] md:flex-[30%] lg:flex-[20%]">
            <p className="font-bold">Year of manufacture:</p>
            <p className="font-light">{product.yearOfProduction}</p>
          </div>
          <div className="flex flex-row items-center justify-between flex-[100%] sm:flex-[45%] md:flex-[30%] lg:flex-[20%]">
            <p className="font-bold">Water resistance:</p>
            <p className="font-light">{product.waterResistance} mm</p>
          </div>
          <div className="flex flex-row items-center justify-between flex-[100%] sm:flex-[45%] md:flex-[30%] lg:flex-[20%]">
            <p className="font-bold">Case material:</p>
            <p className="font-light">{product.caseMaterial}</p>
          </div>
          <div className="flex flex-row items-center justify-between flex-[100%] sm:flex-[45%] md:flex-[30%] lg:flex-[20%]">
            <p className="font-bold">Case size:</p>
            <p className="font-light">{product.caseSize} mm</p>
          </div>
        </div>
      </div>
    </div>
  );
}
