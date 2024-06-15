import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Descriptions, message, Input, Button } from "antd";
import "../styles/sellRequest-ReDetail.css";

export default function SellRequestDetail() {
  const { id } = useParams(); // Lấy ID từ URL
  const [sellRequest, setSellRequest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSellRequest();
  }, [id]);

  const fetchSellRequest = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/sell-request/${id}`);
      setSellRequest(response.data);
      setLoading(false);
    } catch (error) {
      message.error("Failed to fetch sell request details");
      setLoading(false);
    }
  };

  const handleInputChange = (section, field, value) => {
    if (section === "sellForm") {
      setSellRequest((prevRequest) => ({
        ...prevRequest,
        sellForm: {
          ...prevRequest.sellForm,
          [field]: value,
        },
      }));
    } else if (section === "watchForm") {
      setSellRequest((prevRequest) => ({
        ...prevRequest,
        watchForm: {
          ...prevRequest.watchForm,
          model: {
            ...prevRequest.watchForm.model,
            [field]: value,
          },
        },
      }));
    } else {
      setSellRequest((prevRequest) => ({
        ...prevRequest,
        [field]: value,
      }));
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3000/sell-request/${id}`, sellRequest);
      message.success("Sell request updated successfully");
    } catch (error) {
      message.error("Failed to update sell request");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!sellRequest) {
    return <div>Sell request not found</div>;
  }

  return (
    <div className="container">
      <h2>Sell Request Details</h2>
      <Descriptions bordered>
        <Descriptions.Item label="ID">{sellRequest.id}</Descriptions.Item>
        <Descriptions.Item label="First Name">
          <Input
            value={sellRequest.sellForm.firstName}
            onChange={(e) => handleInputChange("sellForm", "firstName", e.target.value)}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Last Name">
          <Input
            value={sellRequest.sellForm.lastName}
            onChange={(e) => handleInputChange("sellForm", "lastName", e.target.value)}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Address">
          <Input
            value={sellRequest.address}
            onChange={(e) => handleInputChange(null, "address", e.target.value)}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Telephone">
          <Input
            value={sellRequest.sellForm.telephone}
            onChange={(e) => handleInputChange("sellForm", "telephone", e.target.value)}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Email">
          <Input
            value={sellRequest.sellForm.email}
            onChange={(e) => handleInputChange("sellForm", "email", e.target.value)}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Brand">
          <Input
            value={sellRequest.watchForm.brand}
            onChange={(e) => handleInputChange("watchForm", "brand", e.target.value)}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Model Name">
          <Input
            value={sellRequest.watchForm.model.name}
            onChange={(e) => handleInputChange("watchForm", "name", e.target.value)}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Model Number">
          <Input
            value={sellRequest.watchForm.model.modelNumber}
            onChange={(e) => handleInputChange("watchForm", "modelNumber", e.target.value)}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Serial Number">
          <Input
            value={sellRequest.watchForm.model.serialNumber}
            onChange={(e) => handleInputChange("watchForm", "serialNumber", e.target.value)}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Year">
          <Input
            value={sellRequest.watchForm.model.yearOfManufacture}
            onChange={(e) => handleInputChange("watchForm", "yearOfManufacture", e.target.value)}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Sell Method">
          <Input
            value={sellRequest.sellForm.sellMethod}
            onChange={(e) => handleInputChange("sellForm", "sellMethod", e.target.value)}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Initial Offer">
          <Input
            value={sellRequest.sellForm.initialOffer}
            onChange={(e) => handleInputChange("sellForm", "initialOffer", e.target.value)}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Minimum Servicing Fee">
          <Input
            value={sellRequest.sellForm.minimumServicingFee}
            onChange={(e) => handleInputChange("sellForm", "minimumServicingFee", e.target.value)}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Total">
          <Input
            value={sellRequest.sellForm.total}
            onChange={(e) => handleInputChange("sellForm", "total", e.target.value)}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Has Original Box">
          <Input
            value={sellRequest.sellForm.hasOriginalBox ? "Yes" : "No"}
            onChange={(e) => handleInputChange("sellForm", "hasOriginalBox", e.target.value.toLowerCase() === "yes")}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Has Original Papers">
          <Input
            value={sellRequest.sellForm.hasOriginalPapers ? "Yes" : "No"}
            onChange={(e) => handleInputChange("sellForm", "hasOriginalPapers", e.target.value.toLowerCase() === "yes")}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Is Limited Edition">
          <Input
            value={sellRequest.sellForm.isLimitedEdition ? "Yes" : "No"}
            onChange={(e) => handleInputChange("sellForm", "isLimitedEdition", e.target.value.toLowerCase() === "yes")}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Has Factory Stickers">
          <Input
            value={sellRequest.sellForm.hasFactoryStickers ? "Yes" : "No"}
            onChange={(e) => handleInputChange("sellForm", "hasFactoryStickers", e.target.value.toLowerCase() === "yes")}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Purchased From Watchfinder">
          <Input
            value={sellRequest.sellForm.purchasedFromWatchfinder ? "Yes" : "No"}
            onChange={(e) => handleInputChange("sellForm", "purchasedFromWatchfinder", e.target.value.toLowerCase() === "yes")}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Customs Check Option">
          <Input
            value={sellRequest.sellForm.customsCheckOption}
            onChange={(e) => handleInputChange("sellForm", "customsCheckOption", e.target.value)}
          />
        </Descriptions.Item>
      </Descriptions>
      <div className="update-button">
        <Button type="primary" onClick={handleUpdate}>
          Update
        </Button>
      </div>
    </div>
  );
}
