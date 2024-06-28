import React, { useState } from "react";
import { Modal, Input, Button, Switch, Select, Form, Row, Col } from "antd";

const { Option } = Select;

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
  const [waterResistance, setWaterResistance] = useState(
    product.waterResistance
  );
  const [caseMaterial, setCaseMaterial] = useState(product.caseMaterial);
  const [caseSize, setCaseSize] = useState(product.caseSize);
  const [status, setStatus] = useState(product.status);

  const handleEdit = () => {
    console.log("Name: ", name);
    console.log("Box: ", box);
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
      status,
    });
    setOpen(false);
  };
  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      footer={[
        <Button key="cancel" onClick={() => setOpen(false)}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleEdit}>
          Save
        </Button>,
      ]}
      style={{
        top: 20,
      }}
    >
      <h1 className="text-xl text-bold">Product Information</h1>
      <Form layout="vertical" initialValues={product}>
        <Form.Item name="image">
          <Row gutter={16} align="middle">
            <Col span={20}>
              <img
                src={image}
                alt="Product"
                className="w-full mb-2"
                style={{ maxHeight: "300px", objectFit: "contain" }}
              />
            </Col>
            <Col span={6}>
              <input type="file" onChange={handleFileChange} accept="image/*" />
            </Col>
          </Row>
        </Form.Item>

        <Form.Item
          label="Product Name"
          name="name"
          rules={[{ required: true, message: "Please enter the product name" }]}
        >
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Item>

        <Form.Item label="Description" name="description" className="fit">
          <Input.TextArea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Box Included" name="box" valuePropName="checked">
          <Switch checked={box} onChange={(checked) => setBox(checked)} />
        </Form.Item>

        <Form.Item
          label="Papers Included"
          name="papers"
          valuePropName="checked"
        >
          <Switch checked={papers} onChange={(checked) => setPapers(checked)} />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Price"
              name="price"
              rules={[
                { required: true, message: "Please enter the product Price" },
              ]}
            >
              <Input
                value={Math.round(price * 100) / 100}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              label="Type"
              name="type"
              rules={[
                { required: true, message: "Please enter the product Type" },
              ]}
            >
              <Select value={type} onChange={(value) => setType(value)}>
                <Option value="Automatic">Automatic</Option>
                <Option value="Quartz">Quartz</Option>
                <Option value="Solar">Solar</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Brand"
              name="brand"
              rules={[
                { required: true, message: "Please enter the product Brand" },
              ]}
            >
              <Input value={brand} onChange={(e) => setBrand(e.target.value)} />
            </Form.Item>

            <Form.Item label="Dial Color" name="dialColor">
              <Select
                value={dialColor}
                onChange={(value) => setDialColor(value)}
              >
                <Option value="White">White</Option>
                <Option value="Gray">Gray</Option>
                <Option value="Silver">Silver</Option>
                <Option value="Black">Black</Option>
                <Option value="None">None</Option>
                <Option value="Beige">Beige</Option>
                <Option value="Gold">Gold</Option>
                <Option value="Brown">Brown</Option>
                <Option value="Pink">Pink</Option>
                <Option value="Blue">Blue</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Water Resistance (meters)"
              name="waterResistance"
              rules={[
                {
                  required: true,
                  message: "Please enter the product Water Resistance",
                },
              ]}
            >
              <Input
                value={waterResistance}
                onChange={(e) => setWaterResistance(e.target.value)}
              />
            </Form.Item>

            <Form.Item label="Case Material" name="caseMaterial">
              <Input
                value={caseMaterial}
                onChange={(e) => setCaseMaterial(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              label="Case Size (mm)"
              name="caseSize"
              rules={[
                {
                  required: true,
                  message: "Please enter the product Case Size",
                },
              ]}
            >
              <Input
                value={caseSize}
                onChange={(e) => setCaseSize(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              label="Status"
              name="status"
              rules={[
                { required: true, message: "Please enter the product status" },
              ]}
            >
              <Select value={status} onChange={(value) => setStatus(value)}>
                <Option value="IN APPRAISAL">IN APPRAISAL</Option>
                <Option value="AVAILABLE">AVAILABLE</Option>
                <Option value="ORDERED">ORDERED</Option>
                <Option value="SOLD">SOLD</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ProductEdit;
