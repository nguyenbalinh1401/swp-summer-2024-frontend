import React, { useState } from "react";
import { Timeline, Modal } from "antd";
import { useSellContext } from "../context/sellContext";
import "../styles/last-action-sell.css";
import { Button } from "antd";

const LastActionSell = () => {
  const { watchForm, sellForm } = useSellContext();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [requestSent, setRequestSent] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);

  // const addresses = ["123 Street, City, Country", "456 Avenue, Town, Country"]; // Danh sách địa chỉ

  const handleSelectAddress = (address) => {
    setSelectedAddress(address); // Lưu địa chỉ đã chọn
    setModalVisible(false); // Ẩn modal sau khi chọn địa chỉ
  };
  const handleSendRequest = () => {
    // Gửi yêu cầu đến server
    fetch("/api/notify-quay-tham-dinh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        address: selectedAddress,
        watchForm,
        sellForm
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log("Response from server:", data);
        setRequestSent(true); // Cập nhật trạng thái sau khi yêu cầu đã được gửi thành công
      })
      .catch(error => {
        console.error("Error:", error);
      });
  };
  const getFormattedDate = () => {
    const currentDate = new Date();
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return currentDate.toLocaleDateString(undefined, options);
  };

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
                {/* <li>Total expected payout: {sellForm.totalExpectedPayout}</li> */}
                <li>Initial offer (subject to inspection): {sellForm.initialOffer}</li>

                <li>Minimum servicing fee: {sellForm.minimumServicingFee}</li>
              </ul>
            ) : (
              <p>No sell form data available</p>
            )}
            <h3>Title: Total expected payout</h3>
            <p>
              This estimate is valid until {getFormattedDate()}. For us to make your final offer, you'll need to send us your watch to be checked by one of our experts. Once this is done, we'll contact you with a quote. You can get your watch to us for inspection in this way:
            </p>
            <div>
              <button onClick={() => setModalVisible(true)}>Drop off in Boutique</button>
              {selectedAddress && ( // Hiển thị địa chỉ đã chọn nếu có
                <div>
                  <p>Selected address: {selectedAddress}</p>
                  <p>Provide additional details about your watch to speed up the process.</p>
                </div>
              )}
            </div>
            <p>Provide additional details about your watch to speed up the process.</p>
            <Button type="primary" onClick={handleSendRequest} disabled={requestSent}>
              {requestSent ? "Request Sent" : "Send Request"}
            </Button>
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
            <li>
              <img src={watchForm.model?.image} alt={watchForm.model?.name} style={{ width: '200px', height: '200px' }} />
            </li>
          </ul>
        ) : (
          <p>No watch form data available</p>
        )}
      </div>
      {/* Modal hiển thị danh sách địa chỉ */}
      <Modal
        title="Select Address"
        visible={modalVisible} // Sử dụng modalVisible thay vì modalOpen
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <div style={{ marginBottom: '10px' }}>
          <img src="/images/address_0.jpg" alt="123 Street, City, Country" style={{ width: '100%', height: 'auto', marginBottom: '5px' }} />
          <Button type="primary" onClick={() => handleSelectAddress("123 Street, City, Country")}>Select</Button>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <img src="/images/address_1.jpg" alt="456 Avenue, Town, Country" style={{ width: '100%', height: 'auto', marginBottom: '5px' }} />
          <Button type="primary" onClick={() => handleSelectAddress("456 Avenue, Town, Country")}>Select</Button>
        </div>
      </Modal>



    </div>
  );
};

export default LastActionSell;
