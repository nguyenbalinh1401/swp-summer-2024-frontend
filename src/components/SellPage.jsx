import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Input, Button, Checkbox, Upload, theme } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import styles from "../styles/sell-page.module.css";
import { useSellContext } from "../context/sellContext";

const { Content } = Layout;

export default function SellPage() {
  const navigate = useNavigate();
  const { updateWatchForm, watchForm } = useSellContext();
  const [initialOffer, setInitialOffer] = useState("");
  const [minimumServicingFee, setMinimumServicingFee] = useState(0);
  const [total, setTotal] = useState(0);
  const [showFirstSlide, setShowFirstSlide] = useState(true);
  const [showSecondSlide, setShowSecondSlide] = useState(false);
  const [hasOriginalBox, setHasOriginalBox] = useState(false);
  const [hasOriginalPapers, setHasOriginalPapers] = useState(false);
  const [isLimitedEdition, setIsLimitedEdition] = useState(false);
  const [hasReport, setHasReport] = useState(false);
  const [fileList, setFileList] = useState([]);

  const onOriginalBoxChange = (e) => {
    setHasOriginalBox(e.target.checked);
  };

  const onOriginalPapersChange = (e) => {
    setHasOriginalPapers(e.target.checked);
  };

  const onLimitedEditionChange = (e) => {
    setIsLimitedEdition(e.target.checked);
  };

  const handleWatchValueChange = (e) => {
    setInitialOffer(e.target.value);
  };

  const handleWatchValuation = () => {
    const marketValue = watchForm?.marketValue || 0;
    let fee = minimumServicingFee;
    if (hasOriginalBox) fee -= 50;
    if (hasOriginalPapers) fee -= 50;
    const total = marketValue - fee + parseFloat(initialOffer || 0);
    setTotal(total);
    setShowFirstSlide(false);
    setShowSecondSlide(true);
  };

  const handleReportChange = (e) => {
    setHasReport(e.target.checked);
  };

  const handleFileChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const handleFormSubmitWithReport = async () => {
    try {
      const moreWatchForm = {
        initialOffer,
        hasOriginalBox,
        hasOriginalPapers,
        isLimitedEdition,
        minimumServicingFee,
        total,
        reportFile: fileList[0]?.originFileObj,
      };

      // Update sell form in context
      updateWatchForm(moreWatchForm);

      // Redirect user to success page
      navigate('/success');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleFormSubmitWithoutReport = () => {

    try {
      const moreWatchForm = {
        initialOffer,
        hasOriginalBox,
        hasOriginalPapers,
        isLimitedEdition,
        minimumServicingFee,
        total,
        reportFile: fileList[0]?.originFileObj,
      };

      // Update sell form in context
      updateWatchForm(moreWatchForm);

      // Redirect user to success page
      navigate('/lastActionSell');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  //-----------------------
  // Check watchForm and update minimum servicing fee
  useEffect(() => {
    if (watchForm !== null) {
      setMinimumServicingFee(100);
    } else {
      setMinimumServicingFee(200);
    }
  }, [watchForm]);

  const renderWatchInfo = () => {
    if (!watchForm) {
      return <p>No watch information available.</p>;
    }

    return (
      <div className={styles.watchInfo}>
        <img src={watchForm.image} alt={watchForm.brand} />
        <h3>{watchForm.brand}</h3>
      </div>
    );
  };

  return (
    <Layout>
      <Content className={styles.contentHome}>
        <div
          className={styles.contentInner}
          style={{
            background: theme.colorBgContainer,
            borderRadius: theme.borderRadiusLG,
          }}
        >
          {showFirstSlide && (
            <div className={styles.sellContent}>
              {renderWatchInfo()}
              <h2>About your watch</h2>
              <div className={styles.formGroup}>
                <label>Do you have the original box?</label>
                <Checkbox checked={hasOriginalBox} onChange={onOriginalBoxChange}>Yes</Checkbox>
              </div>
              <div className={styles.formGroup}>
                <label>Do you have the original papers?</label>
                <Checkbox
                  checked={hasOriginalPapers}
                  onChange={onOriginalPapersChange}
                >
                  Yes
                </Checkbox>
              </div>
              <div className={styles.formGroup}>
                <label>Is your watch a limited edition?</label>
                <Checkbox checked={isLimitedEdition} onChange={onLimitedEditionChange}>Yes</Checkbox>
              </div>
              <h3>Watch Valuation</h3>
              <Input placeholder="Enter your initial offer" value={initialOffer} onChange={handleWatchValueChange} />
              <Button type="primary" onClick={handleWatchValuation}>Valuate Watch</Button>
            </div>
          )}
          {showSecondSlide && (
            <div className={styles.watchValuationResult}>
              <h3>Watch Report</h3>
              <div className={styles.formGroup}>
                <label>Do you have a report for the watch?</label>
                <Checkbox checked={hasReport} onChange={handleReportChange}>Yes</Checkbox>
              </div>
              {hasReport && (
                <div className={styles.formGroup}>
                  <Upload
                    fileList={fileList}
                    onChange={handleFileChange}
                    beforeUpload={() => false} // Prevent auto upload
                  >
                    <Button icon={<UploadOutlined />}>Upload Report</Button>
                  </Upload>
                </div>
              )}
              <div>
                <Button type="primary" className={styles.backButton} onClick={() => setShowFirstSlide(true)}>
                  Back
                </Button>
                {hasReport ? (
                  <Button
                    type="primary"
                    className={styles.submitButton}
                    onClick={handleFormSubmitWithReport}
                    disabled={!fileList.length}
                  >
                    Submit
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    className={styles.submitButton}
                    onClick={handleFormSubmitWithoutReport}
                  >
                    Next
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </Content>
    </Layout>
  );
}
