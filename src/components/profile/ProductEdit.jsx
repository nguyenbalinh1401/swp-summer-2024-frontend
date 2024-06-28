// import React, { useState } from "react";
// import { Modal } from "antd";

// export default function ProductEdit({ open, setOpen, product }) {
//   const [name, setName] = useState(product.name);
//   const [box, setBox] = useState(product.box);
  
//   const handleEdit = () => {
//     console.log("Name: ", name);
//     console.log("Box: ", box);
//   };
//   return (
//     <Modal
//       title={`Edit product`}
//       open={open}
//       onCancel={() => {
//         setOpen(false);
//       }}
//       onOk={handleEdit}
//     >
//       <input
//         type="text"
//         placeholder="Product's name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         className="min-w-fit p-2"
//       />
//       <div className="flex items-center gap-4">
//         <p>Box: </p>
//         <div className="flex items-center justify-center">
//           <button
//             onClick={() => setBox(true)}
//             className={`py-2 px-16 border font-bold text-sm ${
//               box ? "bg-sky-700 text-white" : "hover:bg-slate-100"
//             }`}
//           >
//             YES
//           </button>
//           <button
//             onClick={() => setBox(false)}
//             className={`py-2 px-16 border ${
//               !box ? "bg-sky-700 text-white" : "hover:bg-slate-100"
//             }`}
//           >
//             NO
//           </button>
//         </div>
//       </div>
//     </Modal>
//   );
// }import React, { useState } from "react";
import { Modal, Input, Button } from "antd";

export default function ProductEdit({ open, setOpen, product }) {
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

  const handleEdit = () => {
    console.log({
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
    });
    setOpen(false);
  };

  return (
    <Modal
      title={`Edit Product`}
      open={open}
      onCancel={() => setOpen(false)}
      onOk={handleEdit}
    >
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
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        className="mb-2"
      />
      <Input
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="mb-2"
      />
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
      <div className="flex items-center gap-4 mb-2">
        <p>Box: </p>
        <Button
          onClick={() => setBox(true)}
          className={`py-2 px-16 border font-bold text-sm ${box ? "bg-sky-700 text-white" : "hover:bg-slate-100"}`}
        >
          YES
        </Button>
        <Button
          onClick={() => setBox(false)}
          className={`py-2 px-16 border ${!box ? "bg-sky-700 text-white" : "hover:bg-slate-100"}`}
        >
          NO
        </Button>
      </div>
      <div className="flex items-center gap-4 mb-2">
        <p>Papers: </p>
        <Button
          onClick={() => setPapers(true)}
          className={`py-2 px-16 border font-bold text-sm ${papers ? "bg-sky-700 text-white" : "hover:bg-slate-100"}`}
        >
          YES
        </Button>
        <Button
          onClick={() => setPapers(false)}
          className={`py-2 px-16 border ${!papers ? "bg-sky-700 text-white" : "hover:bg-slate-100"}`}
        >
          NO
        </Button>
      </div>
      <Input
        placeholder="Water Resistance"
        value={waterResistance}
        onChange={(e) => setWaterResistance(e.target.value)}
        className="mb-2"
      />
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
    </Modal>
  );
}
