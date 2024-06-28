import React, { useState } from "react";
import { Modal, Input, Button } from "antd";
import "tailwindcss/tailwind.css";

const ProductEdit = ({ open, setOpen, product }) => {
  const [name, setName] = useState(product.name);
  const [brand, setBrand] = useState(product.brand);
  const [description, setDescription] = useState(product.description);
  const [image, setImage] = useState(product.image);
  const [price, setPrice] = useState(product.price);
  const [type, setType] = useState(product.type);
  const [dialColor, setDialColor] = useState(product.dialColor);
  const [box, setBox] = useState(product.box);
  const [papers, setPapers] = useState(product.papers);
  const [waterResistance, setWaterResistance] = useState(product.waterResistance);
  const [caseMaterial, setCaseMaterial] = useState(product.caseMaterial);
  const [caseSize, setCaseSize] = useState(product.caseSize);
  const [status, setStatus] = useState(product.status);

  const handleEdit = () => {
    const updatedProduct = {
      name,
      brand,
      description,
      image,
      price,
      type,
      dialColor,
      box,
      papers,
      waterResistance,
      caseMaterial,
      caseSize,
      status,
    };
    console.log("Updated Product: ", updatedProduct);
    setOpen(false);
  };

  return (
    <Modal
      title="Edit Product"
      open={open}
      onCancel={() => setOpen(false)}
      onOk={handleEdit}
      okText="Save"
      cancelText="Cancel"
      className="w-2/3"
    >
      <div className="flex flex-col gap-4">
        <div className="mb-4">
          <label className="block mb-2">Image</label>
          <div className="flex items-center gap-4">
            <div className="flex-grow">
              <img src={image} alt="Product" className="w-full mb-2" />
              <Input
                placeholder="Image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="mb-2"
              />
            </div>
            <Button onClick={() => setImage("")} className="mb-2">
              Edit
            </Button>
          </div>
        </div>
        <Input
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-2"
        />
        <Input
          placeholder="Brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="mb-2"
        />
        <Input.TextArea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mb-2"
        />
        <Input
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="mb-2"
        />
        <div className="flex items-center gap-4 mb-2">
          <label>Box:</label>
          <Button
            onClick={() => setBox(true)}
            className={`py-2 px-4 border font-bold text-sm ${box ? "bg-sky-700 text-white" : "hover:bg-slate-100"}`}
          >
            YES
          </Button>
          <Button
            onClick={() => setBox(false)}
            className={`py-2 px-4 border ${!box ? "bg-sky-700 text-white" : "hover:bg-slate-100"}`}
          >
            NO
          </Button>
        </div>
        <div className="flex items-center gap-4 mb-2">
          <label>Papers:</label>
          <Button
            onClick={() => setPapers(true)}
            className={`py-2 px-4 border font-bold text-sm ${papers ? "bg-sky-700 text-white" : "hover:bg-slate-100"}`}
          >
            YES
          </Button>
          <Button
            onClick={() => setPapers(false)}
            className={`py-2 px-4 border ${!papers ? "bg-sky-700 text-white" : "hover:bg-slate-100"}`}
          >
            NO
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Input
              placeholder="Type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="mb-2"
            />
            <Input
              placeholder="Dial Color"
              value={dialColor}
              onChange={(e) => setDialColor(e.target.value)}
              className="mb-2"
            />
            <Input
              placeholder="Brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="mb-2"
            />
            <Input
              placeholder="Water Resistance"
              value={waterResistance}
              onChange={(e) => setWaterResistance(e.target.value)}
              className="mb-2"
            />
          </div>
          <div>
            <Input
              placeholder="Case Material"
              value={caseMaterial}
              onChange={(e) => setCaseMaterial(e.target.value)}
              className="mb-2"
            />
            <Input
              placeholder="Case Size"
              value={caseSize}
              onChange={(e) => setCaseSize(e.target.value)}
              className="mb-2"
            />
            <Input
              placeholder="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="mb-2"
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProductEdit;
