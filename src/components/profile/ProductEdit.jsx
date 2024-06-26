import React, { useState } from "react";
import { Modal } from "antd";

export default function ProductEdit({ open, setOpen, product }) {
  const [name, setName] = useState(product.name);
  const [box, setBox] = useState(product.box);
  
  const handleEdit = () => {
    console.log("Name: ", name);
    console.log("Box: ", box);
  };
  return (
    <Modal
      title={`Edit product`}
      open={open}
      onCancel={() => {
        setOpen(false);
      }}
      onOk={handleEdit}
    >
      <input
        type="text"
        placeholder="Product's name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="min-w-fit p-2"
      />
      <div className="flex items-center gap-4">
        <p>Box: </p>
        <div className="flex items-center justify-center">
          <button
            onClick={() => setBox(true)}
            className={`py-2 px-16 border font-bold text-sm ${
              box ? "bg-sky-700 text-white" : "hover:bg-slate-100"
            }`}
          >
            YES
          </button>
          <button
            onClick={() => setBox(false)}
            className={`py-2 px-16 border ${
              !box ? "bg-sky-700 text-white" : "hover:bg-slate-100"
            }`}
          >
            NO
          </button>
        </div>
      </div>
    </Modal>
  );
}
