import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import { Checkbox } from "antd";

export default function CartList({ list, getCheckedList }) {
  const [checkedList, setCheckedList] = useState([]);
  const [isAllChecked, setIsAllChecked] = useState([]);

  const handleCheckAll = (e) => {
    if (e.target.checked) {
      setIsAllChecked(true);
      setCheckedList(list);
      getCheckedList(list);
    } else {
      setIsAllChecked(false);
      setCheckedList([]);
      getCheckedList([]);
    }
  };

  const getCheckedItem = (value) => {
    console.log("Checked item: ", value.item);
    if (value.checked === true) {
      setCheckedList([...checkedList, value.item]);
      getCheckedList(checkedList);
    } else {
      const listAfterRemove = checkedList.filter((i) => i.id != value.item.id);
      setCheckedList(listAfterRemove);
      getCheckedList(listAfterRemove);
    }
  };

  return (
    <div className="w-full flex flex-col items-start px-8">
      <div className="w-full flex items-center justify-between text-white rounded-t-xl bg-teal-950 px-4 py-8">
        <p className="font-black text-3xl">SHOPPING CART</p>
        <Link to="/" className="flex items-center gap-2 hover:text-slate-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="currentColor"
          >
            <path d="M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z"></path>
          </svg>
          <p>Continue Shopping</p>
        </Link>
      </div>

      <div className="w-full min-h-[60vh] max-h-[60vh] flex flex-col items-center justify-start gap-2 px-4 py-2 overflow-x-hidden overflow-y-auto">
        {list.map((item) => {
          return (
            <CartItem
              key={item.id}
              item={item}
              checked={isAllChecked}
              getCheckedItem={getCheckedItem}
            />
          );
        })}
      </div>
      <div className="w-full flex items-center justify-between text-white rounded-b-xl p-4 pl-10 bg-teal-800">
        <Checkbox
          onChange={handleCheckAll}
          className="font-bold text-white text-xl"
        >
          Select all &#40;{list.length} item{list.length > 1 ? "s" : ""}
          &#41;
        </Checkbox>
        <p>Selected 1 item</p>
      </div>
    </div>
  );
}
