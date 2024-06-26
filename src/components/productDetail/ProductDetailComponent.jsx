import { Avatar, message } from "antd";
import React, { useState } from "react";

export default function ProductDetailComponent({ product }) {
  const [messageApi, contextHolder] = message.useMessage();

  const handleBuyNow = () => {
    window.location.href = "/cart";
  };

  return (
    <div className="w-full flex flex-col justify-center font-montserrat gap-4">
      {contextHolder}
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
            <button
              onClick={handleBuyNow}
              className="w-full flex items-center justify-center gap-2 rounded-md bg-teal-500 hover:bg-teal-700 font-bold text-sm text-white mx-auto py-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="currentColor"
              >
                <path d="M7.00488 7.99966V5.99966C7.00488 3.23824 9.24346 0.999664 12.0049 0.999664C14.7663 0.999664 17.0049 3.23824 17.0049 5.99966V7.99966H20.0049C20.5572 7.99966 21.0049 8.44738 21.0049 8.99966V20.9997C21.0049 21.5519 20.5572 21.9997 20.0049 21.9997H4.00488C3.4526 21.9997 3.00488 21.5519 3.00488 20.9997V8.99966C3.00488 8.44738 3.4526 7.99966 4.00488 7.99966H7.00488ZM7.00488 9.99966H5.00488V19.9997H19.0049V9.99966H17.0049V11.9997H15.0049V9.99966H9.00488V11.9997H7.00488V9.99966ZM9.00488 7.99966H15.0049V5.99966C15.0049 4.34281 13.6617 2.99966 12.0049 2.99966C10.348 2.99966 9.00488 4.34281 9.00488 5.99966V7.99966Z"></path>
              </svg>
              Buy now
            </button>
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
            <p className="font-bold">Year of production:</p>
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
