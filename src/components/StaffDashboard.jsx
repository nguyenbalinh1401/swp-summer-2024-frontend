import React, { useEffect, useState } from "react";
import { Table, Button, message } from "antd";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../styles/StaffDashBoardStyle.module.css";
export default function StaffDashboard() {
  const { role } = useParams(); // Lấy vai trò từ URL
  const [sellRequests, setSellRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSellRequests();
  }, [role]);

  const fetchSellRequests = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/sell-request/view/staff1`);
      setSellRequests(response.data.sellRequests);
      setLoading(false);
    } catch (error) {
      message.error("Failed to fetch sell requests");
      setLoading(false);
    }
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { 
      title: "Name", 
      dataIndex: "firstName", 
      key: "firstName",
      render: (text, record) => `${record.sellForm.firstName} ${record.sellForm.lastName}`
    },
    { title: "Watch Model", dataIndex: ["watchForm", "model", "name"], key: "modelName" ,
      render: (text, record) => `${record.watchForm.name} `
    },
    
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button onClick={() => navigate(`/sell-request/${record.id}`)}>View Details</Button>
      ),
    },
  ];

  return (
    <div className={styles.StaffDashBoard}>
      <h2 className={styles.h2Style}>{role === 'staff1' ? 'Staff 1' : 'Staff 2'} - Sell Requests</h2>
      <Table
        columns={columns}
        dataSource={sellRequests}
        loading={loading}
        rowKey="id"
      />
    </div>
  );
}
