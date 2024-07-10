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
        setProductData(value);
    };

    const [formData, setFormData] = useState({
        box: "", // Ensure formData.box has a default value
        details: "",
        imageList: [], // Ensure formData.imageList has a default value
        pdfList: [], // Ensure formData.pdfList has a default value
        currentStep: 0,
        nameWatch: "",
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

    const handleFileChange = async (name) => async (info) => {
        let fileList = [...info.fileList];
        fileList = fileList.slice(-1); // Limit to only one file
        const file = fileList[0].originFileObj;

        // Upload file to Firebase
        const imgRef = ref(imageDb, `files/${v4()}`);
        const snapshot = await uploadBytes(imgRef, file);
        const url = await getDownloadURL(snapshot.ref);

        setFormData((prevState) => ({
            ...prevState,
            [name]: fileList,
            imageUrl: url, // Set the URL of the uploaded image
        }));
    };



    const handleNext = () => {
        const { currentStep, box } = formData;
        let nextStep = currentStep + 1;

        if (currentStep === 0 && box === "no") {
            nextStep = 2;
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
                name: productData?.name || formData.nameWatch,
                brand: productData?.brand || "not done",
                price: productData?.price || 0,
                description: productData?.description || "not done",
                type: productData?.type || "not done",
                image: productData?.imageList?.[0]?.url || formData.imageList?.[0]?.originFileObj,
                dialColor: productData?.dialColor || "not done",
                box: productData.box === "yes",
                papers: productData?.papers || false,
                waterResistance: productData?.waterResistance || 0,
                caseMaterial: productData?.caseMaterial || "not done",
                caseSize: productData?.caseSize || 0,
                pastUsageTime: productData?.pastUsageTime || 0,
                yearOfProduction: productData?.yearOfProduction || 0,
                remainingInsurance: productData?.remainingInsurance || 0,
                status: "IN APPRAISAL",
            };

            const productResponse = await axios.post("http://localhost:3000/product", newProductData);
            const productId = productResponse.data.id;

            const updateData = {
                image: formData.imageList[0]?.url || formData.imageList[0]?.originFileObj,
                pdf: formData.pdfList[0]?.url || formData.pdfList[0]?.originFileObj,
            };

            const requestData = {
                account: user.id,
                product: productId,
                type: "create",
                update: updateData,
                details: formData.details,
                status: "approved",
            };

            const requestResponse = await axios.post("http://localhost:3000/sellerRequest", requestData);

            // Show success notification
            notification.success({
                message: "Success",
                description: "Your information has been submitted successfully!",
            });

            // Log responses
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
                    {formData.box === "no" && (
                        <div className="mt-4">
                            <Button type="primary" onClick={() => setIsEnteringProduct(true)}>
                                Enter Product Data
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
            content: (
                <div className="flex flex-col space-y-4">
                    {formData.box === "yes" && (
                        <>
                            <div className="grid grid-cols-3 gap-4">
                                <label className="col-span-1 self-center">Detail</label>
                                <div className="col-span-2">
                                    <Input
                                        name="details"
                                        value={formData.details}
                                        onChange={handleChange}
                                        placeholder="Enter product description"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <label className="col-span-1 self-center">Name Watch: </label>
                                <div className="col-span-2">
                                    <Input
                                        name="nameWatch"
                                        value={formData.nameWatch}
                                        onChange={handleChange}
                                        placeholder="Enter product Name"
                                    />
                                </div>
                            </div>


                            <div className="grid grid-cols-3 gap-4">
                                <label className="col-span-1 self-center">Image</label>
                                <div className="col-span-2">
                                    {formData.imageUrl && (
                                        <img
                                            src={formData.imageUrl}
                                            alt="Uploaded"
                                            style={{ width: '100%', marginBottom: '10px' }}
                                        />
                                    )}
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

                            <div className="grid grid-cols-3 gap-4">
                                <label className="col-span-1 self-center">PDF Document</label>
                                <div className="col-span-2">
                                    <Upload
                                        name="pdf"
                                        beforeUpload={() => false}
                                        onChange={handleFileChange("pdfList")}
                                        fileList={formData.pdfList}
                                    >
                                        <Button size="large" icon={<UploadOutlined />}>
                                            Click to upload PDF
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

            content: (
                <div className="flex flex-col space-y-4">
                    <label className="col-span-1 self-center">Review your details and click Submit.</label>
                    <div className="grid grid-cols-3 gap-4">
                        <label className="col-span-1 self-center">Detail</label>
                        <div className="col-span-2">
                            <p>{formData.details}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <label className="col-span-1 self-center">Image</label>
                        <div className="col-span-2">
                            {formData.imageList.length > 0 && (
                                <img
                                    src={URL.createObjectURL(formData.imageList[0].originFileObj)}
                                    alt="Product"
                                    style={{ width: '100%' }}
                                />
                            )}
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <label className="col-span-1 self-center">PDF Document</label>
                        <div className="col-span-2">
                            {formData.pdfList.length > 0 && (
                                <a
                                    href={URL.createObjectURL(formData.pdfList[0].originFileObj)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    View PDF
                                </a>
                            )}
                        </div>
                    </div>

                </div>
            ),
        },
    ];

    return (
        <div className="container mx-auto px-4">
            <div className="w-full md:w-2/3 mx-auto bg-white p-8 rounded-lg shadow-lg overflow-hidden mt-10">
                <Steps current={formData.currentStep} className="mb-8">
                    {steps.map((item, index) => (
                        <Step key={index} />
                    ))}
                </Steps>
                <div className="steps-content mb-8">{steps[formData.currentStep].content}</div>
                <div className="flex justify-end">
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

