import { Modal } from "antd";
import React from "react";
import ReportHTML from "../ReportHTML";

export default function ProductCertificate({ open, setOpen, product }) {
  return (
    <Modal
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
