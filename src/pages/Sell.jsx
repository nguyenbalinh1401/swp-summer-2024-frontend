import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Upload,
  message,
  notification,
  Radio,
  InputNumber,
  Steps,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const { Step } = Steps;

export default function Sell() {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [box, setBox] = useState(null);
  const [formValues, setFormValues] = useState({});
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      if (fileList.length === 0) {
        message.error("Please upload an image.");
        return;
      }
      const formData = new FormData();
      formData.append("image", fileList[0].originFileObj);
      const imageResponse = await fetch(
        "http://localhost:3000/sell/uploadImage",
        {
          method: "POST",
          body: formData,
        }
      );
      if (!imageResponse.ok) {
        throw new Error("Image upload failed");
      }
      const imageData = await imageResponse.json();
      console.log("Image uploaded successfully:", imageData);
      values.imagePath = imageData.imagePath;
      const dataResponse = await fetch(
        "http://localhost:3000/sell/information",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (!dataResponse.ok) {
        throw new Error("Data submission failed");
      }

      const data = await dataResponse.json();
      console.log("Data saved successfully:", data);

      notification.success({
        message: "Success",
        description: "Your information has been submitted successfully!",
      });
    } catch (error) {
      console.error("Error submitting form:", error);

      notification.error({
        message: "Error",
        description:
          "There was an error submitting the form. Please try again.",
      });

      setTimeout(() => {
        navigate("/sell");
      }, 2000);
    }
  };

  const onFileChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const steps = [
    {
      title: "Check",
      content: (
        <>
          <Form
            form={form}
            onFinish={(values) => {
              setFormValues(values);
              setCurrentStep(box === "yes" ? 2 : 1);
            }}
            layout="vertical"
          >
            <Form.Item
              label="Watch Name"
              name="watchName"
              rules={[
                { required: true, message: "Please enter the watch name" },
              ]}
              className="mb-4"
            >
              <Input size="large" className="full" />
            </Form.Item>
            <Form.Item
              label="Your Name"
              name="name"
              rules={[{ required: true, message: "Please enter your name" }]}
              className="mb-4"
            >
              <Input size="large" className="full" />
            </Form.Item>
            <Form.Item
              label="Phone Number"
              name="phoneNumber"
              rules={[
                { required: true, message: "Please enter your phone number" },
              ]}
              className="mb-4"
            >
              <InputNumber
                controls={false}
                size="large"
                min={0}
                style={{ width: "98.5%" }}
              />
            </Form.Item>
            <div className="flex flex-col items-start">
              <Form.Item
                label="Does your watch have an appraisal certificate yet ?"
                name="box"
                rules={[
                  {
                    required: true,
                    message: "Please select Yes or No",
                  },
                ]}
              >
                <Radio.Group
                  onChange={(e) => {
                    setBox(e.target.value);
                  }}
                  value={box}
                >
                  <Radio value="yes">Yes</Radio>
                  <Radio value="no">No</Radio>
                </Radio.Group>
              </Form.Item>
              {box === "yes" && (
                <>
                  <Form.Item
                    label="Upload Your watch appraisal certificate"
                    name="documents"
                    rules={[
                      { required: true, message: "Please upload an image" },
                    ]}
                  >
                    <Upload
                      name="documents"
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
                  <Form.Item
                    label="Image"
                    name="image"
                    rules={[
                      { required: true, message: "Please upload an image" },
                    ]}
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
                  <Form.Item
                    label="Price you want to sell"
                    name="price"
                    rules={[
                      { required: true, message: "Please enter the price" },
                    ]}
                    layout="vertical"
                    className="flex flex-col"
                  >
                    <InputNumber
                      controls={false}
                      size="large"
                      min={0}
                      style={{ width: "1380px" }}
                    />
                  </Form.Item>
                </>
              )}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Form.Item>
                  <Button type="primary" size="large" htmlType="submit">
                    Next
                  </Button>
                </Form.Item>
              </div>
            </div>
          </Form>
        </>
      ),
    },
    {
      title: "Information",
      content: (
        <Form
          form={form}
          onFinish={(values) => {
            setFormValues((prev) => ({ ...prev, ...values }));
            setCurrentStep(2);
          }}
          layout="vertical"
        >
          <Form.Item
            label="Do you have original box ?"
            name="originalBox"
            rules={[
              {
                required: true,
                message: "Please select yes or no",
              },
            ]}
          >
            <Radio.Group>
              <Radio value="yes">Yes</Radio>
              <Radio value="no">No</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Does your watch have original paper ?"
            name="paper"
            rules={[
              {
                required: true,
                message: "Please select yes or no",
              },
            ]}
          >
            <Radio.Group>
              <Radio value="yes">Yes</Radio>
              <Radio value="no">No</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Is your watch a limited edition ?"
            name="limitedEdition"
            rules={[
              {
                required: true,
                message: "Please select yes or no",
              },
            ]}
          >
            <Radio.Group>
              <Radio value="yes">Yes</Radio>
              <Radio value="no">No</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Price you want to sell"
            name="price"
            rules={[{ required: true, message: "Please enter the price" }]}
          >
            <InputNumber
              controls={false}
              size="large"
              min={0}
              style={{ width: "98.5%" }}
            />
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
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Form.Item>
              <Button
                type="primary"
                size="large"
                onClick={() => setCurrentStep(currentStep - 1)}
              >
                Previous
              </Button>
            </Form.Item>
            <Form.Item>
              <Button type="primary" size="large" htmlType="submit">
                Next
              </Button>
            </Form.Item>
          </div>
        </Form>
      ),
    },
    {
      title: "Submit",
      content: (
        <div>
          <h2 className="text-center text-3xl font-bold mb-4">
            Check Information
          </h2>
          <div>
            <h3>Watch Name: {formValues.watchName}</h3>
            <h3>Your Name: {formValues.name}</h3>
            <h3>Phone Number: {formValues.phoneNumber}</h3>
            {box === "no" && (
              <>
                <h3>Do you have original box? {formValues.originalBox}</h3>
                <h3>
                  Does your watch have original documents?{" "}
                  {formValues.documents}
                </h3>
                <h3>
                  Is your watch a limited edition? {formValues.limitedEdition}
                </h3>
              </>
            )}
            <h3>Price you want to sell: {formValues.price}</h3>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Form.Item>
              <Button
                type="primary"
                size="large"
                onClick={() => {
                  currentStep !== 1 && box !== "yes"
                    ? setCurrentStep(1)
                    : setCurrentStep(currentStep - 2);
                }}
              >
                Previous
              </Button>
            </Form.Item>
            <Form.Item>
              <Button type="primary" size="large" onClick={form.submit}>
                Submit
              </Button>
            </Form.Item>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full max-w-full p-10 border border-gray-300 rounded-lg shadow-lg bg-white mx-5">
      <h1 className="text-center text-3xl font-bold mb-4">
        Information For Sell
      </h1>
      <Steps current={currentStep}>
        {steps.map((step, index) => (
          <Step key={index} title={step.title} />
        ))}
      </Steps>
      <div className="steps-content">{steps[currentStep].content}</div>
    </div>
  );
}
