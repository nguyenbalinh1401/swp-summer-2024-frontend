import React, { useEffect, useState } from "react";
import dateFormat from "../../assistants/date.format";
import { Avatar, message, Tooltip } from "antd";
import ProductEdit from "./ProductEdit";

export default function SingleTimepiece({ product }) {
  const [isEditing, setIsEditing] = useState(false);
  const date = dateFormat(product.createdAt, "dd");
  const month = dateFormat(product.createdAt, "mmm");

  const getStatus = () => {
    if (product.status === "IN APPRAISAL") {
      return (
        <button className="w-40 bg-amber-600 hover:bg-amber-500 rounded-[30px] flex items-center justify-center text-white font-bold py-2">
          IN APPRAISAL
        </button>
      );
    } else if (product.status === "AVAILABLE") {
      return (
        <button className="w-40 bg-green-600 hover:bg-green-500 rounded-[30px] flex items-center justify-center text-white font-bold py-2">
          AVAILABLE
        </button>
      );
    } else if (product.status === "ORDERED") {
      return (
        <button className="w-40 bg-cyan-600 hover:bg-cyan-500 rounded-[30px] flex items-center justify-center text-white font-bold py-2">
          ORDERED
        </button>
      );
    } else if (product.status === "SOLD") {
      return (
        <button className="w-40 bg-stone-600 hover:bg-stone-500 rounded-[30px] flex items-center justify-center text-white font-bold py-2">
          SOLD
        </button>
      );
    }
  };

  return (
    <>
      <div className="w-full flex items-center justify-between border-b border-gray-200 p-4 hover:bg-slate-100 rounded-lg rounded-b-none">
        <div className="min-w-fit flex items-center justify-start gap-10">
          <div className="flex flex-col items-center justify-start">
            <p className="font-black text-[2em]">{date}</p>
            <p className="text-xs">{month}</p>
          </div>

          <div className="flex items-center gap-2">
            <Avatar src={product.image} alt="" size={64} />
            <span className="flex flex-col items-start">
              <Tooltip title={product.name}>
                <p className="text-lg font-bold min-w-96 max-w-96 text-nowrap text-ellipsis overflow-hidden cursor-pointer">
                  {product.name}
                </p>
              </Tooltip>
              <div className="w-full flex items-center justify-between pr-2">
                <p className="text-xs font-light">{product.brand}</p>
                <p className="text-red-600 text-md font-semibold">
                  ${Math.round(product.price * 100) / 100}
                </p>
              </div>
            </span>
          </div>
        </div>

        <div className="w-full flex items-center justify-end gap-2 lg:gap-16">
          <div className="w-full flex justify-end">{getStatus()}</div>

          <div
            className={`${
              product.status === "SOLD" && "invisible"
            } flex items-center gap-8 px-8`}
          >
            <button onClick={() => setIsEditing(true)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="currentColor"
              >
                <path d="M5 18.89H6.41421L15.7279 9.57627L14.3137 8.16206L5 17.4758V18.89ZM21 20.89H3V16.6473L16.435 3.21231C16.8256 2.82179 17.4587 2.82179 17.8492 3.21231L20.6777 6.04074C21.0682 6.43126 21.0682 7.06443 20.6777 7.45495L9.24264 18.89H21V20.89ZM15.7279 6.74785L17.1421 8.16206L18.5563 6.74785L17.1421 5.33363L15.7279 6.74785Z"></path>
              </svg>
            </button>

            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="fill-red-600"
              >
                <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"></path>
              </svg>
            </button>
            <ProductEdit
              open={isEditing}
              setOpen={setIsEditing}
              product={product}
            />
          </div>
        </div>
      </div>
    </>
  );
}
