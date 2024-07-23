import { Modal } from "antd";
import React from "react";
import ReportHTML from "../ReportHTML";

export default function ProductCertificate({ open, setOpen, product }) {
  return (
    <Modal
      title={
        <p className="text-sky-800 font-light text-xs">
          Appraisal certification of{" "}
          <span className="font-semibold">{product.name}</span>
        </p>
      }
      open={open}
      onCancel={(e) => {
        e.stopPropagation();
        setOpen(false);
      }}
      footer={null}
      width={1000}
    >
      <div className="w-full p-16">
        <ReportHTML productData={product} />
      </div>
    </Modal>
  );
}
