import React, { useState } from "react";
import { Form, Input, Button, Upload, message, notification, Steps } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import ToggleButton from "../components/ToggleButton";
import ProductForm from "../components/profile/ProductForm";
import { useNavigate } from "react-router-dom";

const { Step } = Steps;

const Sell2 = () => {
    const navigate = useNavigate();

    // Assuming user is fetched from sessionStorage
    const user = sessionStorage.signInUser ? JSON.parse(sessionStorage.signInUser) : null;

    const [isEnteringProduct, setIsEnteringProduct] = useState(false);
    const [productData, setProductData] = useState();
    const getProductData = (value) => {
        console.log("Product: ", value);
    };

    const [formData, setFormData] = useState({

        box: "", // Ensure formData.box has a default value
        details: "",
        currentStep: 0,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleNumberChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (name) => (info) => {
        let fileList = [...info.fileList];
        fileList = fileList.slice(-1); // Limit to only one file
        setFormData((prevState) => ({
            ...prevState,
            [name]: fileList,
            currentStep: formData.currentStep === 1 ? 2 : formData.currentStep,
        }));
    };

    const handleNext = () => {
        let nextStep;
        if (formData.box === "yes") {
            nextStep = 2;
        } else {
            nextStep = 1; 
        }

        setFormData({
            ...formData,
            currentStep: nextStep,
        });
    };


    const handlePrevious = () => {
        setFormData({
            ...formData,
            currentStep: formData.currentStep - 1,
        });
    };



    const handleSubmit = async () => {
        try {
            // Prepare data for API call
            const newProductData = {
                owner: user.id,
                name: "not done",
                brand: "not done",
                price: 0,
                description: "not done",
                type: "not done",
                image: formData.imageList[0]?.url,
                dialColor: "not done",
                box: false,
                papers: false,
                waterResistance: 0,
                caseMaterial: "not done",
                caseSize: 0,
                pastUsageTime: 0,
                yearOfProduction: 0,
                remainingInsurance: 0,
                status: "IN APPRAISAL",
            };

            
            const productResponse = await axios.post("http://localhost:3000/product", newProductData);
            const productId = productResponse.data.id;

            
            const requestData = {
                account: user.id,
                product: productId,
                type: "create",
                update: null, 
                details: formData.details, 
                status: "approved", 
            };

            
            const requestResponse = await axios.post("http://localhost:3000/sellerRequest", requestData);

            // Show success notification
            notification.success({
                message: "Success",
                description: "Your information has been submitted successfully!",
                
            });

            //log
            console.log(productResponse);
            console.log(requestResponse);

            // Redirect to success page
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
                <div>
                    <div className="grid grid-cols-3 gap-4">
                        <label className="col-span-1 self-center">Does your watch have an appraisal certificate yet?</label>
                        <div>
                            <ToggleButton
                                name="box"
                                onChange={handleChange}
                                value={formData.box}
                            />
                        </div>
                    </div>
                    {formData.box === "yes" && (
                        <div>
                            <Button type="primary" onClick={() => setIsEnteringProduct(true)}>
                                Enter product data
                            </Button>
                            {isEnteringProduct && (
                                <ProductForm
                                    open={isEnteringProduct}
                                    setOpen={setIsEnteringProduct}
                                    editable={true}
                                    getProductData={getProductData} // Replace with actual function
                                />
                            )}
                        </div>
                    )}
                    
                </div>
            ),
        },
        {
            title: "Information",
            content: (
                <div className="flex flex-col space-y-4">
                    {formData.box === "no" && (
                        <>
                            
                            <div className="grid grid-cols-3 gap-4">
                                <label className="col-span-1 self-center">Detail</label>
                                <div className="col-span-2">
                                    <Input
                                        name="description"
                                        value={formData.details}
                                        onChange={handleChange}
                                        placeholder="Enter product description"
                                    />
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-3 gap-4">
                                <label className="col-span-1 self-center">Image</label>
                                <div className="col-span-2">
                                    <Upload
                                        name="image"
                                        listType="picture"
                                        beforeUpload={() => false}
                                        onChange={handleFileChange("imageList")}
                                        fileList={formData.imageList}
                                    >
                                        <Button size="large" icon={<UploadOutlined />}>
                                            Click to upload
                                        </Button>
                                    </Upload>
                                </div>
                            </div>
                            
                        </>
                    )}
                </div>
            ),
        },
        {
            title: "Review",
            content: (
                <div className="flex flex-col space-y-4">
                    <label className="col-span-1 self-center">Review your details and click Submit.</label>
                    {/* <p>Watch Name: {formData.watchName}</p>
                    <p>Your Name: {formData.name}</p>
                    <p>Phone Number: {formData.phoneNumber}</p> */}
                    
                </div>
            ),
        },
    ];

    return (
        <div className="container mx-auto px-4">
            <div className="w-2/3 mx-auto bg-white p-8 rounded-lg shadow-lg overflow-hidden mt-10">
                <div className="bg-gray-100 px-6 py-4 border-b border-gray-200">
                    <Steps current={formData.currentStep}>
                        {steps.map((item, index) => (
                            <Step key={index} title={item.title} />
                        ))}
                    </Steps>
                    <div className="steps-content mt-8">{steps[formData.currentStep].content}</div>
                </div>
                <div className="flex justify-end mt-6">
                    {formData.currentStep > 0 && (
                        <Button style={{ marginRight: 8 }} onClick={handlePrevious}>
                            Previous
                        </Button>
                    )}
                    {formData.currentStep < steps.length - 1 && (
                        <Button type="primary" onClick={handleNext}>
                            Next
                        </Button>
                    )}
                    {formData.currentStep === steps.length - 1 && (
                        <Button type="primary" onClick={handleSubmit}>
                            Submit
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Sell2;
