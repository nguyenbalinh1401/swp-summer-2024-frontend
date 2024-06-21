import React, { useState } from "react";
import { Form, Input, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

export default function Sell() {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const onFinish = async (values) => {
    try {
      if (fileList.length === 0) {
        message.error("Please upload an image.");
        return;
      }

      const formData = new FormData();
      formData.append("image", fileList[0].originFileObj);

      // Upload the image
      const imageResponse = await fetch("http://localhost:3000/sell/uploadImage", {
        method: "POST",
        body: formData,
      });

      if (!imageResponse.ok) {
        throw new Error("Image upload failed");
      }

      const imageData = await imageResponse.json();
      console.log("Image uploaded successfully:", imageData);

      // Add the image path to the values object
      values.imagePath = imageData.imagePath;

      // Send the form data
      const dataResponse = await fetch("http://localhost:3000/sell/information", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!dataResponse.ok) {
        throw new Error("Data submission failed");
      }

      const data = await dataResponse.json();
      console.log("Data saved successfully:", data);
    } catch (error) {
      console.error("Error submitting form:", error);
      message.error("Error submitting form. Please try again.");
    }
  };

  const onFileChange = ({ fileList }) => {
    setFileList(fileList);
  };

  return (
    <div className="w-1/2 mt-10 ml-20 justify-center">
      <h1 className="text-3xl font-bold mb-4">Information For Sell</h1>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          label="Watch Name"
          name="watchName"
          rules={[{ required: true, message: "Please enter the watch name" }]}
        >
          <Input size="large" />
        </Form.Item>

        <Form.Item
          label="Your Name"
          name="name"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          label="Phone Number"
          name="phoneNumber"
          rules={[{ required: true, message: "Please enter your phone number" }]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, type: "email", message: "Please enter a valid email" }]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          label="Image"
          name="image"
          rules={[{ required: true, message: "Please upload an image" }]}
        >
          <Upload
            name="image"
            listType="picture"
            beforeUpload={() => false}
            onChange={onFileChange}
            fileList={fileList}
          >
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
}
