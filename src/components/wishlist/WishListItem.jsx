import { Avatar } from "antd";
import React from "react";

export default function WishListItem({ product, getRemoveItem }) {
  const handleRemove = () => {
    getRemoveItem(product);
  };

  return (
    <div className="basis-[32%] shrink bg-white drop-shadow-md flex flex-col justify-between gap-2 p-4 rounded-md">
      <div className="flex justify-between gap-2">
        <img src={product.image} alt="" className="w-16 h-16 rounded-full" />
        <div className="w-full flex flex-col items-start gap-2 text-xs">
          <p className="opacity-70">{product.brand}</p>
          <p className="font-semibold">{product.name}</p>
          <p>$ {Math.round(product.price * 100) / 100}</p>
          <div className="flex items-center gap-1">
            <p className="text-[0.7em] opacity-80">owned by</p>
            <Avatar src={product.owner.avatar} size={24} />
            <p className="text-[0.9em]">{product.owner.username}</p>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-around items-center text-xs py-2">
        <button className="flex items-center gap-2 border border-gray-400 rounded-md p-2 hover:bg-slate-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="currentColor"
          >
            <path d="M19 7H24V9H19V7ZM17 12H24V14H17V12ZM20 17H24V19H20V17ZM2 22C2 17.5817 5.58172 14 10 14C14.4183 14 18 17.5817 18 22H16C16 18.6863 13.3137 16 10 16C6.68629 16 4 18.6863 4 22H2ZM10 13C6.685 13 4 10.315 4 7C4 3.685 6.685 1 10 1C13.315 1 16 3.685 16 7C16 10.315 13.315 13 10 13ZM10 11C12.21 11 14 9.21 14 7C14 4.79 12.21 3 10 3C7.79 3 6 4.79 6 7C6 9.21 7.79 11 10 11Z"></path>
          </svg>
          CONTACT
        </button>
        <button
          onClick={handleRemove}
          className="flex items-center gap-2 border border-gray-400 rounded-md p-2 hover:bg-slate-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="currentColor"
          >
            <path d="M4 8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8ZM6 10V20H18V10H6ZM9 12H11V18H9V12ZM13 12H15V18H13V12ZM7 5V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V5H22V7H2V5H7ZM9 4V5H15V4H9Z"></path>
          </svg>
          REMOVE
        </button>
      </div>
    </div>
  );
}
