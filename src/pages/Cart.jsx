import React, { useEffect, useState } from "react";
import CartList from "../components/cart/CartList";
import { useCookies } from "react-cookie";
import CartSummary from "../components/cart/CartSummary";

export default function Cart() {
  // const [cartList, setCartList] = useState(
  //   sessionStorage.cartList ? sessionStorage.cartList : []
  // );
  const [checkedList, setCheckedList] = useState([]);
  const tempCart = [
    {
      id: "1",
      name: "watch 1",
      image:
        "https://i.pinimg.com/736x/06/83/87/068387ac1c3c2d4b1eb5a5fc872d6101.jpg",
      price: 199000,
    },
    {
      id: "2",
      name: "watch 2",
      image:
        "https://i.pinimg.com/736x/06/83/87/068387ac1c3c2d4b1eb5a5fc872d6101.jpg",
      price: 199000,
    },
    {
      id: "3",
      name: "watch 3",
      image:
        "https://i.pinimg.com/736x/06/83/87/068387ac1c3c2d4b1eb5a5fc872d6101.jpg",
      price: 199000,
    },
    {
      id: "4",
      name: "watch 4",
      image:
        "https://i.pinimg.com/736x/06/83/87/068387ac1c3c2d4b1eb5a5fc872d6101.jpg",
      price: 199000,
    },
    {
      id: "5",
      name: "watch 5",
      image:
        "https://i.pinimg.com/736x/06/83/87/068387ac1c3c2d4b1eb5a5fc872d6101.jpg",
      price: 199000,
    },
    {
      id: "6",
      name: "watch 6",
      image:
        "https://i.pinimg.com/736x/06/83/87/068387ac1c3c2d4b1eb5a5fc872d6101.jpg",
      price: 199000,
    },
  ];

  const getCheckedList = (value) => {
    setCheckedList(value);
  };

  return (
    <div className="w-full flex items-start justify-center gap-16 px-16">
      <div className="w-2/3">
        <CartList list={tempCart} getCheckedList={getCheckedList} />
      </div>
      <div className="w-1/3">
        <CartSummary list={checkedList} />
      </div>
    </div>
  );
}
