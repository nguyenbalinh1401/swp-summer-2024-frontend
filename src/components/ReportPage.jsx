import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Spin, Divider } from "antd";
import ReportHTML from "./ReportHTML"; // Import the new HTML-based report component

const ReportPage = () => {
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const reportRef = useRef(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/product/75c54918-93b6-4067-b6b3-bef44ea828db`
        );
        setProductData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch product data:", error);
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  const handleDownloadHTML = () => {
    if (reportRef.current) {
      const htmlContent = reportRef.current.outerHTML;
      const blob = new Blob([htmlContent], { type: "text/html" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "report.html";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      console.error("Report ref is not available.");
    }
  };

  const styles = {
    reportContainer: {
      padding: "20px",
      minHeight: "100vh",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f0f2f5",
    },
    report: {
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
      width: "100%",
      maxWidth: "800px",
    },
    smallFrame: {
      border: "1px solid #ccc",
      borderRadius: "4px",
      padding: "20px",
      margin: "20px auto",
      maxWidth: "1000px",
      maxHeight: "1000px",
      overflow: "auto",
    },
  };

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <div style={styles.reportContainer}>
      <div style={styles.report}>
        {/* Khung nhỏ để hiển thị ReportHTML */}
        <div style={styles.smallFrame} ref={reportRef}>
          <ReportHTML productData={productData} />
        </div>

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <div className="action-button" onClick={handleDownloadHTML}>
            Download HTML
          </div>

          <div className="action-button">Other Action</div>
        </div>

        <Divider />
      </div>
    </div>
  );
};

export default ReportPage;
