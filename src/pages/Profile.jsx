import React, { useEffect, useState } from "react";
import UserProfile from "../components/profile/UserProfile";
import ProfileCharts from "../components/profile/ProfileCharts";
import OrderHistory from "../components/profile/OrderHistory";
import axios from "axios";
import TimepiecesManagement from "../components/profile/TimepiecesManagement";

export default function Profile() {
  const user =
    sessionStorage.signInUser && JSON.parse(sessionStorage.signInUser);
  const [orders, setOrders] = useState([]);
  const [userProducts, setUserProducts] = useState([]);

  const fetchUserOrder = async () => {
    await axios
      .get(`http://localhost:3000/order/user/${user.id}`)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => console.log(err));
  };

  const fetchProductListOfUser = async () => {
    await axios
      .get(`http://localhost:3000/product/user/${user.id}`)
      .then((res) => {
        setUserProducts(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchUserOrder();
    fetchProductListOfUser();
  }, []);

  return (
    <div className="w-full min-h-[80vh] flex flex-col items-start justify-center gap-8 p-16 bg-slate-100">
      <div className="w-full flex items-start justify-center gap-8 overflow-auto">
        <div className="w-1/3">
          <UserProfile />
        </div>
        <ProfileCharts orderList={orders} productList={userProducts} />
      </div>
      <div className="w-full flex items-start justify-center gap-4 overflow-hidden">
        <div className="bg-white w-1/4 flex flex-col gap-1 rounded-lg px-2 py-4">
          <button
            onClick={() => (window.location.href = "/profile")}
            className={`${
              window.location.pathname === "/profile"
                ? "bg-cyan-900 text-white"
                : "hover:bg-slate-100 text-black"
            } flex items-center gap-2 rounded-xl text-lg duration-200 px-4 py-1`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="currentColor"
            >
              <path d="M9 6H15C15 4.34315 13.6569 3 12 3C10.3431 3 9 4.34315 9 6ZM7 6C7 3.23858 9.23858 1 12 1C14.7614 1 17 3.23858 17 6H20C20.5523 6 21 6.44772 21 7V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V7C3 6.44772 3.44772 6 4 6H7ZM5 8V20H19V8H5ZM9 10C9 11.6569 10.3431 13 12 13C13.6569 13 15 11.6569 15 10H17C17 12.7614 14.7614 15 12 15C9.23858 15 7 12.7614 7 10H9Z"></path>
            </svg>
            Orders
          </button>
          <button
            onClick={() => (window.location.href = "/profile/manage-product")}
            className={`${
              window.location.pathname === "/profile/manage-product"
                ? "bg-cyan-900 text-white"
                : "hover:bg-slate-200 text-black"
            } min-w-fit text-nowrap flex items-center gap-2 rounded-xl text-lg duration-200 px-4 py-1`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="currentColor"
            >
              <path d="M21 13V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V13H2V11L3 6H21L22 11V13H21ZM5 13V19H19V13H5ZM4.03961 11H19.9604L19.3604 8H4.63961L4.03961 11ZM6 14H14V17H6V14ZM3 3H21V5H3V3Z"></path>
            </svg>
            Timepiece Management
          </button>
        </div>
        {window.location.pathname === "/profile" ? (
          <OrderHistory list={orders} />
        ) : (
          <TimepiecesManagement list={userProducts} />
        )}
      </div>
    </div>
  );
}
