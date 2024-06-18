import React, { useState, useEffect } from "react";
import {useNavigate } from "react-router-dom";
import styles from "../styles/sell-page.module.css";
import { Layout,  Input, Button, Checkbox } from "antd";
import { useSellContext } from "../context/sellContext";

export default function SellPage() {

const { Content } = Layout;


  const navigate = useNavigate();
  const { updateSellForm, watchForm } = useSellContext();
  const [initialOffer, setInitialOffer] = useState("");
  const [minimumServicingFee, setMinimumServicingFee] = useState(0);
  const [total, setTotal] = useState(0);
  const [showFirstSlide, setShowFirstSlide] = useState(true);
  const [showSecondSlide, setShowSecondSlide] = useState(false);
  const [showThirdSlide, setShowThirdSlide] = useState(false);
  const [hasOriginalBox, setHasOriginalBox] = useState(false);
  const [hasOriginalPapers, setHasOriginalPapers] = useState(false);
  const [hasFactoryStickers, setHasFactoryStickers] = useState(false);
  const [isLimitedEdition, setIsLimitedEdition] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");

  const onOriginalBoxChange = (e) => {
    setHasOriginalBox(e.target.checked);
  };

  const onOriginalPapersChange = (e) => {
    setHasOriginalPapers(e.target.checked);
  };

  const onFactoryStickersChange = (e) => {
    setHasFactoryStickers(e.target.checked);
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
    setShowThirdSlide(false);
  };

  const handleNextDetails = () => {
    setShowFirstSlide(false);
    setShowSecondSlide(false);
    setShowThirdSlide(true);
  };

  const handleFormSubmit = async () => {
    try {
      const newSellForm = {
        initialOffer,
        hasOriginalBox,
        hasOriginalPapers,
        hasFactoryStickers,
        isLimitedEdition,
        minimumServicingFee,
        total,
        firstName,
        lastName,
        email,
        telephone,
      };
      updateSellForm({ ...newSellForm });
      console.log('Submitting form with data:', { ...newSellForm });
      navigate('/LastActionSell');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleBackToFirstSlide = () => {
    setShowFirstSlide(true);
    setShowSecondSlide(false);
    setShowThirdSlide(false);
  };

  const handleBackToSecondSlide = () => {
    setShowFirstSlide(false);
    setShowSecondSlide(true);
    setShowThirdSlide(false);
  };

  useEffect(() => {
    if (watchForm !== null) {
      setMinimumServicingFee(100);
    } else {
      setMinimumServicingFee(200);
    }
  }, [watchForm]);

  const renderWatchInfo = () => (
    <div className={styles.watchInfo}>
      <img src={watchForm?.model?.image} alt={watchForm?.brand?.name} />
      <h3>{watchForm?.brand?.name}</h3>
    </div>
  );

  return (
    <Layout>
      
      <Content className={styles.contentHome}>
        <div className={styles.contentInner}>
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
                <Checkbox checked={hasOriginalPapers} onChange={onOriginalPapersChange}>Yes</Checkbox>
              </div>
              <div className={styles.formGroup}>
                <label>Is your watch unworn with factory stickers intact?</label>
                <Checkbox checked={hasFactoryStickers} onChange={onFactoryStickersChange}>Yes</Checkbox>
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
              <h3>Your Watch Valuation</h3>
              <p>Minimum Servicing Fee: ${minimumServicingFee}</p>
              <p>Total Valuation: ${total}</p>
              <Button type="primary" onClick={handleNextDetails}>Next</Button>
              <Button onClick={handleBackToFirstSlide}>Back</Button>
            </div>
          )}
          {showThirdSlide && (
            <div className={styles.userDetails}>
              <h3>Your Details</h3>
              <div className={styles.formGroup}>
                <label>First Name</label>
                <Input
                  placeholder="Enter First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Last Name</label>
                <Input
                  placeholder="Enter Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Email</label>
                <Input
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Telephone</label>
                <Input
                  placeholder="Enter Telephone Number"
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                />
              </div>
              <Button type="primary" onClick={handleFormSubmit}>Submit</Button>
              <Button onClick={handleBackToSecondSlide}>Back</Button>
            </div>
          )}
        </div>
      </Content>
    </Layout>
  );
}

