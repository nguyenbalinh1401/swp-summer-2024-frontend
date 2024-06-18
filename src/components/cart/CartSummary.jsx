import { Avatar } from "antd";
import React, { useEffect, useState } from "react";
import CurrencySplitter from "../../assistants/currencySpliter";

export default function CartSummary({ list }) {
  const [total, setTotal] = useState(0);
  const getTotal = () => {
    setTotal(0);
    if (list.length === 0) return;
    else {
      list.map((item) => {
        setTotal((cur) => cur + item.price);
      });
    }
  };

  useEffect(() => {
    getTotal();
  }, [list]);

  return (
    <div className="w-full flex flex-col items-start gap-4 p-8 rounded-xl bg-teal-950 text-white">
      <p className="font-black text-3xl">SUMMARY</p>

      <div className={`w-full flex items-center justify-between`}>
        <p>Items selected: </p>
        {list.length > 0 ? (
          <Avatar.Group
            max={{
              count: 4,
              style: {
                color: "#E8FFFD",
                backgroundColor: "#134E4A",
                cursor: "pointer",
              },
              popover: {
                trigger: "click",
              },
            }}
          >
            {list.map((item) => {
              return <Avatar key={item.id} src={item.image} />;
            })}
          </Avatar.Group>
        ) : (
          <Avatar icon={<>...</>} />
        )}
      </div>

      <div className="w-full flex flex-row items-center justify-between">
        <div className="flex flex-col items-start gap-4">
          <p>Sub total: </p>
          <p>Total: </p>
        </div>

        <div className="flex flex-col items-end gap-4">
          <p>{CurrencySplitter(total)}</p>
          <p>{CurrencySplitter(total)}</p>
        </div>
      </div>
    </div>
  );
}
