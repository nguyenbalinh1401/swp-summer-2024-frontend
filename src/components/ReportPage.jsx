import React, { useState, useEffect } from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Spin, Divider } from 'antd';
import ReportPDF from './ReportPDF'; 


const ReportPage = () => {
  const [sellRequest, setSellRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchSellRequest = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/sell-request/${id}`);
        setSellRequest(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch sell request:', error);
        setLoading(false);
      }
    };

    fetchSellRequest();
  }, [id]);

  if (loading) {
    return <Spin size="large" />;
  }

  // Define inline styles using StyleSheet.create
  const styles = {
    reportContainer: "font-sans p-5 min-h-screen w-full flex justify-center items-center bg-gray-200",
    report: "bg-white p-5 rounded-lg shadow-md w-full max-w-4xl",
    section: "mb-5",
    sectionTitle: "text-xl font-bold mb-2",
    text: "text-base mb-2",
    pdfViewer: "w-full h-150 border border-gray-300 rounded overflow-hidden",
    actionButton: "px-5 py-2 bg-blue-600 text-white rounded cursor-pointer mx-2 shadow-md transition-colors duration-300 ease-in-out inline-block text-center",
    actionButtonDisabled: "bg-gray-300 cursor-not-allowed",
  };

  // Function to handle PDF download
  const handleDownloadPDF = () => {
    // Create a Blob URL for the PDF blob
    const pdfBlobUrl = URL.createObjectURL(new Blob([<ReportPDF sellRequest={sellRequest} />], { type: 'application/pdf' }));

    // Create an anchor element to trigger the download
    const anchorElement = document.createElement('a');
    anchorElement.href = pdfBlobUrl;
    anchorElement.download = 'report.pdf';
    document.body.appendChild(anchorElement); // Append anchor to body
    anchorElement.click(); // Click on anchor to start download
    document.body.removeChild(anchorElement); // Clean up anchor element after download
  };

  return (
    <div style={styles.reportContainer}>
      <div style={styles.report}>
        <h2>Rolex Watch Appraisal Report</h2>

        <PDFViewer style={styles.pdfViewer}>
          <ReportPDF sellRequest={sellRequest} />
        </PDFViewer>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <div
            style={styles.actionButton}
            // onClick={handleDownloadPDF}
          >
            Other
          </div>

          <div
            style={styles.actionButton}
            // onClick={handleDownloadPDF}
          >
            Other
          </div>

        </div>

        <Divider />
      </div>
    </div>
  );
};

export default ReportPage;
