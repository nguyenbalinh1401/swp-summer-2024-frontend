import React, { useState } from "react";
import { Form, Input, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const Sell = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const onFinish = (values) => {
    // Save the form data to the database
    // You can make an API call here to save the data

    console.log("Form values:", values);
  };

  const onFileChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const onNameChange = (e) => {
    console.log("Name:", e.target.value);
  };

  return (
    <div className="w-1/2 mt-10 ml-20 justify-center">
      <h1 className="text-3xl font-bold mb-4">Information For Sell</h1>
      <Form form={form} onFinish={onFinish} >
      <Form.Item
          name="watchName"
          label="Watch Name"
          rules={[{ required: true }]}
        >
          <Input size="large" />
        </Form.Item>

        <Form.Item name="name" label="Your Name" rules={[{ required: true }]}>
          <Input size="large" onChange={onNameChange} />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          label="Phone Number"
          rules={[{ required: true }]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, type: "email" }]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          name="image"
          label="Image"
          valuePropName="fileList"
          getValueFromEvent={onFileChange}
        >
          <Upload name="image" action="/upload" listType="picture">
            <Button size="large" icon={<UploadOutlined />}>
              Click to upload
            </Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" size="large" htmlType="submit">
            Submit
          </Button>
        </Form.Item>

        
      </Form>
    </div>
  );
};

export default Sell;
