import React from "react";
import { Link } from "react-router-dom";
import { Timeline } from "antd";
import { useSellContext } from "../context/sellContext"; // Import hook useSellContext từ SellProvider
import "../styles/last-action-sell.css";

const LastActionSell = () => {
  const { watchForm, sellForm } = useSellContext(); // Lấy dữ liệu từ context

  console.log("Watch Form Data:", watchForm); // Log dữ liệu từ watchForm
  console.log("Sell Form Data:", sellForm); // Log dữ liệu từ sellForm

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
                {/* Hiển thị thông tin từ sellForm */}
                <li>Total expected payout: {sellForm.totalExpectedPayout}</li>
                <li>Initial offer (subject to inspection): {sellForm.initialOffer}</li>
                <li>Minimum servicing fee: {sellForm.minimumServicingFee}</li>
              </ul>
            ) : (
              <p>No sell form data available</p>
            )}
            <h3>Title: Total expected payout</h3>
            <p>
              This estimate is valid until 29/05/2024. For us to make your final offer, you'll need to send us your watch to be checked by one of our experts. Once this is done, we'll contact you with a quote. You can get your watch to us for inspection in this way:
            </p>
            <Link to="/select-store" >
              <button>Drop off in Boutique</button>
            </Link>
            <p>Provide additional details about your watch to speed up the process.</p>
          </Timeline.Item>
          {/* Các Timeline.Item khác */}
        </Timeline>
      </div>
      <div className="details-section">
        <h2>Your Watch</h2>
        {watchForm ? (
          <ul>
            {/* Hiển thị thông tin từ watchForm */}
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
            {/* Hiển thị các thông tin khác từ watchForm */}
          </ul>
        ) : (
          <p>No watch form data available</p>
        )}
        {/* Hiển thị thông tin khác */}
      </div>
    </div>
  );
};

export default LastActionSell;
