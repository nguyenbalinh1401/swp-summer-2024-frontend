import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Spin, Divider } from 'antd';
import ReportHTML from './ReportHTML'; // Import the new HTML-based report component

const ReportPage = () => {
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/product/d9c8cff1-336d-4a47-8ef6-8e6fd99b1605`);
        setProductData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch product data:', error);
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  if (loading) {
    return <Spin size="large" />;
  }
  const handleDownloadHTML = () => {
    // Implement download as HTML logic here, if needed
    console.log('Download as HTML');
  };

  const styles = {
    reportContainer: {
      padding: '20px',
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f0f2f5',
    },
    report: {
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
      width: '100%',
      maxWidth: '800px',
    },
    smallFrame: {
      border: '1px solid #ccc',
      borderRadius: '4px',
      padding: '20px',
      margin: '20px auto',
      maxWidth: '1000px',
      maxHeight: '1000px',
      overflow: 'auto',
    },
  };

  return (
    <div style={styles.reportContainer}>
      <div style={styles.report}>
        <h2>Rolex Watch Appraisal Report</h2>

        {/* Khung nhỏ để hiển thị ReportHTML */}
        <div style={styles.smallFrame}>
          <ReportHTML productData={productData} />
        </div>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <div className="action-button" onClick={handleDownloadHTML}>
            Download HTML
          </div>

          <div className="action-button">
            Other Action
          </div>
        </div>

        <Divider />
      </div>
    </div>
  );
};

export default ReportPage;
