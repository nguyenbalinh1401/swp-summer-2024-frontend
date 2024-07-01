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
import axios from "axios";  // Thêm axios import

const { Step } = Steps;

export default function Sell() {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [box, setBox] = useState(null);
  const [watchName, setWatchName] = useState("");
  const [watchBrand, setWatchBrand] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [documents, setDocuments] = useState("");
  const [image, setImage] = useState("");
  const [priceWantToSell, setPriceWantToSell] = useState(0);
  const [originalBox, setOriginalBox] = useState("");
  const [paper, setPaper] = useState("");

  const user = sessionStorage.signInUser
    ? JSON.parse(sessionStorage.signInUser)
    : null;

  const navigate = useNavigate();

  const onFileChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const handleSubmit = async () => {
    try {
      await form.validateFields();
  
      if (fileList.length === 0) {
        message.error("Please upload an image.");
        return;
      }
  
      // Chuẩn bị dữ liệu cho yêu cầu bán
      let newForm;
      if (box === "yes") {
        newForm = {
          watchBrand,
          watchName,
          name,
          phoneNumber,
          documents,
          image,
          priceWantToSell,
          status: 'WITH_REPORT',
        };
      } else {
        newForm = {
          watchBrand,
          watchName,
          name,
          phoneNumber,
          documents: null,
          image,
          priceWantToSell,
          status: 'WITHOUT_REPORT',
        };
      }
  
      console.log("Sending data:", newForm);
  
      const response1 = await axios.post("http://localhost:3000/sell-request/create", newForm);
  
      let newProduct;
      if (box === "yes") {
        newProduct = {
          owner: user.id,
          name: watchName,
          brand: watchBrand,
          price: priceWantToSell,
          description: 'not done',
          type: 'not done',
          image: image,
          dialColor: 'not done',
          box: false,
          papers: false,
          waterResistance: 0,
          caseMaterial: 'not done',
          caseSize: 0,
          // null dc
          pastUsageTime: null,
          yearOfProduction: null,
          remainingInsurance: null,
          status: 'IN APPRAISAL',
        };
      } else {
        newProduct = {
          owner: user.id,
          name: watchName,
          brand: watchBrand,
          price: priceWantToSell,
          description: 'not done',
          type: 'not done',
          image: image,
          dialColor: 'not done',
          box: false,
          papers: false,
          waterResistance: 0,
          caseMaterial: 'not done',
          caseSize: 0,

          // null dc
          pastUsageTime: null,
          yearOfProduction: null,
          remainingInsurance: null,
          status: 'IN APPRAISAL',
        };
      }
  
      console.log("New product data:", newProduct);
  
      const response2 = await axios.post("http://localhost:3000/product", newProduct);
  
      console.log("Data submitted successfully:", response1.data);
      console.log("Data submitted successfully:", response2.data);
  
      notification.success({
        message: "Success",
        description: "Your information has been submitted successfully!",
      });
  
      navigate("/success");
    } catch (error) {
      console.error("Error submitting form:", error);
  
      if (error.response && error.response.status === 400) {
        message.error("Bad request. Please check your inputs.");
      } else {
        message.error("Failed to submit the form. Please try again later.");
      }
    }
  };

  const steps = [
    {
      title: "Check",
      content: (
        <Form
          form={form}
          onFinish={(values) => {
            setWatchBrand(values.watchBrand);
            setWatchName(values.watchName);
            setName(values.name);
            setPhoneNumber(values.phoneNumber);
            setCurrentStep(box === "yes" ? 2 : 1);
          }}
          layout="vertical"
        >
          <Form.Item
            label="Watch Brand"
            name="watchBrand"
            rules={[
              { required: true, message: "Please enter the watch brand" },
            ]}
            className="mb-4"
          >
            <Input size="large" className="full" onChange={(e) => setWatchBrand(e.target.value)} />
          </Form.Item>
          <Form.Item
            label="Watch Name"
            name="watchName"
            rules={[
              { required: true, message: "Please enter the watch name" },
            ]}
            className="mb-4"
          >
            <Input size="large" className="full" onChange={(e) => setWatchName(e.target.value)} />
          </Form.Item>
          <Form.Item
            label="Your Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
            className="mb-4"
          >
            <Input size="large" className="full" onChange={(e) => setName(e.target.value)} />
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
              onChange={(value) => setPhoneNumber(value)}
            />
          </Form.Item>
          <div className="flex flex-col items-start">
            <Form.Item
              label="Does your watch have an appraisal certificate yet?"
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
                    onChange={(info) => {
                      if (info.file.status === 'done') {
                        setDocuments(info.file.originFileObj);
                      }
                    }}
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
                  name="priceWantToSell"
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
                    onChange={(value) => setPriceWantToSell(value)}
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
      ),
    },
    {
      title: "Information",
      content: (
        <Form
          form={form}
          onFinish={(values) => {
            setOriginalBox(values.originalBox);
            setPaper(values.paper);
            setPriceWantToSell(values.priceWantToSell);
            setCurrentStep(2);
          }}
          layout="vertical"
        >
          <Form.Item
            label="Do you have original box?"
            name="originalBox"
            rules={[
              {
                required: true,
                message: "Please select yes or no",
              },
            ]}
          >
            <Radio.Group onChange={(e) => setOriginalBox(e.target.value)}>
              <Radio value="yes">Yes</Radio>
              <Radio value="no">No</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Does your watch have original paper?"
            name="paper"
            rules={[
              {
                required: true,
                message: "Please select yes or no",
              },
            ]}
          >
            <Radio.Group onChange={(e) => setPaper(e.target.value)}>
              <Radio value="yes">Yes</Radio>
              <Radio value="no">No</Radio>
            </Radio.Group>
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
            name="priceWantToSell"
            rules={[{ required: true, message: "Please enter the price" }]}
          >
            <InputNumber
              controls={false}
              size="large"
              min={0}
              style={{ width: "98.5%" }}
              onChange={(value) => setPriceWantToSell(value)}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" size="large" htmlType="submit">
              Next
            </Button>
          </Form.Item>
        </Form>
      ),
    },
    {
      title: "Review",
      content: (
        <>
          <h3>Review your details and click Submit.</h3>
          <p>Watch Name: {watchName}</p>
          <p>Your Name: {name}</p>
          <p>Phone Number: {phoneNumber}</p>
          {box === "yes" && (
            <>
              <p>Original Box: {originalBox}</p>
              <p>Paper: {paper}</p>
              <p>Price: {priceWantToSell}</p>
              <p>Image: {fileList.map((file) => file.name).join(", ")}</p>
            </>
          )}
          <Button type="primary" size="large" onClick={handleSubmit}>
            Submit
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className="container mx-auto px-4">
      <div className="w-full mx-auto bg-white p-8 rounded shadow">
        <Steps current={currentStep}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content mt-8">{steps[currentStep].content}</div>
      </div>
    </div>
  );
}
