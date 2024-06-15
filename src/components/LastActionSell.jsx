import React, { useState, useEffect } from "react";
import { Timeline, Modal, Button, message } from "antd";
import { useSellContext } from "../context/sellContext";
import "../styles/last-action-sell.css";
import axios from "axios";

const LastActionSell = () => {
  const { watchForm, sellForm } = useSellContext();
  const [selectedAddress, setSelectedAddress] = useState({ address: null, role: null });
  const [requestSent, setRequestSent] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [estimatedPrice, setEstimatedPrice] = useState(0);

  const handleSelectAddress = (address, role) => {
    setSelectedAddress({ address, role });
    setModalVisible(false);
  };

  const handleSendRequest = async () => {
    try {
      console.log("Sending request...");
      const response = await axios.post("http://localhost:3000/sell-request/create", {
        address: selectedAddress.address,
        role: selectedAddress.role,
        watchForm,
        sellForm
      });

      console.log("Response from server:", response.data);
      setRequestSent(true);
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.status === 400) {
        message.open({
          type: "error",
          content: "Invalid request. Please check your input and try again.",
          duration: 5,
        });
      } else {
        message.open({
          type: "error",
          content: "Failed to send the request. Please try again later.",
          duration: 5,
        });
      }
    }
  };

  const getFormattedDate = () => {
    const currentDate = new Date();
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return currentDate.toLocaleDateString(undefined, options);
  };

  const calculateEstimatedPrice = () => {
    const marketValue = watchForm?.marketValue || 0;
    let estimate = marketValue;

    if (sellForm.hasOriginalBox) {
      estimate += 100; // Example addition value
    } else {
      estimate -= 50; // Example deduction value
    }

    if (sellForm.hasOriginalPapers) {
      estimate += 100; // Example addition value
    } else {
      estimate -= 50; // Example deduction value
    }

    if (sellForm.isLimitedEdition) {
      estimate += 200; // Example addition value
    } else {
      estimate -= 100; // Example deduction value
    }

    if (sellForm.hasFactoryStickers) {
      estimate += 150; // Example addition value
    } else {
      estimate -= 75; // Example deduction value
    }

    return estimate;
  };

  useEffect(() => {
    if (sellForm && watchForm) {
      const estimate = calculateEstimatedPrice();
      setEstimatedPrice(estimate);
    }
  }, [sellForm, watchForm]);

  return (
    <div className="container">
      <div className="timeline-section">
        <Timeline>
          <Timeline.Item color="green">
            <h2>Sell Your Watch Enquiry
              <span className="status complete">Completed</span>
            </h2>
          </Timeline.Item>
          <Timeline.Item color="blue">
            <h2>Our Initial Offer
              <span className="status in-progress">In Progress</span>
            </h2>
            {sellForm ? (
              <ul>
                <li className="bold-large-text">Initial offer (subject to inspection): {sellForm.initialOffer}</li>
                <li>Minimum servicing fee: {sellForm.minimumServicingFee}</li>
                <li>Estimated Price: {estimatedPrice}</li>
              </ul>
            ) : (
              <p>No sell form data available</p>
            )}
            <h3>Title: Total expected payout</h3>
            <p>
              This estimate is valid until {getFormattedDate()}. For us to make your final offer, you'll need to send us your watch to be checked by one of our experts. Once this is done, we'll contact you with a quote. You can get your watch to us for inspection in this way:
            </p>
            <div>
              <Button type="primary" onClick={() => setModalVisible(true)}>Drop off in Boutique</Button>
              {selectedAddress.address && (
                <div>
                  <p>Selected address: {selectedAddress.address}</p>
                  <p>Provide additional details about your watch to speed up the process.</p>
                </div>
              )}
            </div>
            <Button type="primary" onClick={handleSendRequest} disabled={requestSent}>
              {requestSent ? "Request Sent" : "Send Request"}
            </Button>
          </Timeline.Item>
        </Timeline>
        <Timeline>
          <Timeline.Item color="gray">
            <h2>Send Your Watch For Authentication And Inspection
              <span className="status pending">Pending</span>
            </h2>
          </Timeline.Item>
          <Timeline.Item color="gray">
            <h2>Final Offer
              <span className="status pending">Pending</span>
            </h2>
          </Timeline.Item>
          <Timeline.Item color="gray">
            <h2>Sale Complete
              <span className="status pending">Pending</span>
            </h2>
          </Timeline.Item>
        </Timeline>
      </div>
      <div className="details-section">
        <h2>Your Watch</h2>
        {watchForm ? (
          <ul>
            <li>Brand: {watchForm.brand?.name}</li>
            <li>Model: {watchForm.model?.name}</li>
            <li>Description: {watchForm.model?.description}</li>
            <li>Model Number: {watchForm.model?.modelNumber}</li>
            <li>Serial Number: {watchForm.model?.serialNumber}</li>
            <li>Year of Manufacture: {watchForm.model?.yearOfManufacture}</li>
            <li>Case Size: {watchForm.model?.caseSize}</li>
            <li>Case Material: {watchForm.model?.caseMaterial}</li>
            <li>Case Color: {watchForm.model?.caseColor}</li>
            <li>Dial Color: {watchForm.model?.dialColor}</li>
            <li>Bracelet Material: {watchForm.model?.braceletMaterial}</li>
            <li>Type: {watchForm.model?.type}</li>
            <li>Limited Edition: {watchForm.model?.limitedEdition ? "Yes" : "No"}</li>
            <li><img src={watchForm.model?.image} alt={watchForm.model?.name} style={{ width: '200px', height: '200px' }} /></li>
          </ul>
        ) : (
          <p>No watch form data available</p>
        )}
      </div>
      <Modal
        title="Select Address"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <div style={{ marginBottom: '10px' }}>
          <img src="/images/address_0.jpg" alt="123 Street, City, Country" style={{ width: '100%', height: 'auto', marginBottom: '5px' }} />
          <Button type="primary" onClick={() => handleSelectAddress("123 Street, City, Country", "staff1")}>Select</Button>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <img src="/images/address_1.jpg" alt="456 Avenue, Town, Country" style={{ width: '100%', height: 'auto', marginBottom: '5px' }} />
          <Button type="primary" onClick={() => handleSelectAddress("456 Avenue, Town, Country", "staff2")}>Select</Button>
        </div>
      </Modal>
    </div>
  );
};

export default LastActionSell;
