import React, { useState } from "react";
import {
  Layout,
  theme,
  Input,
  Button,
  Select,
  Checkbox,
} from "antd";

import "../components/style/SellStyle.css";

const {Content } = Layout;



export default function Sell() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [watchValue, setWatchValue] = useState("");
  const [showFirstSlide, setShowFirstSlide] = useState(true);

  const [sellMethod, setSellMethod] = useState("");
  const [hasOriginalBox, setHasOriginalBox] = useState(false);
  const [hasOriginalPapers, setHasOriginalPapers] = useState(false);
  const [purchasedFromWatchfinder, setPurchasedFromWatchfinder] =
    useState(false);
  const [hasFactoryStickers, setHasFactoryStickers] = useState(false);
  const [watchYear, setWatchYear] = useState("");
  const [isLimitedEdition, setIsLimitedEdition] = useState(false);
  const [showSecondSlide, setShowSecondSlide] = useState(false);
  const [showThirdSlide, setShowThirdSlide] = useState(false);
  const [customsCheckOption, setCustomsCheckOption] = useState("");
  const onSellMethodChange = (value) => {
    setSellMethod(value);
  };

  const onOriginalBoxChange = (e) => {
    setHasOriginalBox(e.target.checked);
  };

  const onOriginalPapersChange = (e) => {
    setHasOriginalPapers(e.target.checked);
  };

  const onWatchfinderChange = (e) => {
    setPurchasedFromWatchfinder(e.target.checked);
  };

  const onFactoryStickersChange = (e) => {
    setHasFactoryStickers(e.target.checked);
  };

  const onWatchYearChange = (value) => {
    setWatchYear(value);
  };

  const onLimitedEditionChange = (e) => {
    setIsLimitedEdition(e.target.checked);
  };

  const handleWatchValueChange = (e) => {
    setWatchValue(e.target.value);
  };

  const handleWatchValuation = () => {
    console.log("Watch value:", watchValue);
    setShowFirstSlide(false);
    setShowSecondSlide(true);
    setShowThirdSlide(false);
  };

  const handleNextDetails = () => {
    setShowFirstSlide(false);
    setShowSecondSlide(false);
    setShowThirdSlide(true);
  };

  const handleOriginalBoxChange = () => {
    setHasOriginalBox(!hasOriginalBox);
  };

  const handleCustomsCheckChange = (e) => {
    setCustomsCheckOption(e.target.value);
  };

  return (
    <Layout>
      
      <Content className="content">
        <div
          className="content-inner"
          style={{
            background: colorBgContainer,
            borderRadius: borderRadiusLG,   
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems:   "flex-start",        
          }}
        >
          {showFirstSlide && (
            
            <div className="sell-content justify-content" >
              <h2>About your watch</h2>
              <div className="form-group">
                <label>You want to Sell and Appraise or just Appraise your watch?</label>
                <Select
                  value={sellMethod}
                  onChange={onSellMethodChange}
                  className="select-option"
                  
                >
                  <Select.Option value="outright">Sell and Appraise</Select.Option>
                  <Select.Option value="trade">Just Appraise</Select.Option>
                </Select>
              </div>
              <div className="form-group">
                <label>Do you have the original box?</label>
                <Checkbox
                  checked={hasOriginalBox}
                  onChange={onOriginalBoxChange}
                  className="check-option"
                >
                  Yes
                </Checkbox>
              </div>
              <div className="form-group">
                <label>Do you have the original papers?</label>
                <Checkbox
                  checked={hasOriginalPapers}
                  onChange={onOriginalPapersChange}
                  className="check-option"
                >
                  Yes
                </Checkbox>
              </div>
              <div className="form-group">
                <label>Was your watch purchased from Watchfinder?</label>
                <Checkbox
                  checked={purchasedFromWatchfinder}
                  onChange={onWatchfinderChange}
                  className="check-option"
                >
                  Yes
                </Checkbox>
              </div>
              <div className="form-group">
                <label>
                  Is your watch unworn with factory stickers intact?
                </label>
                <Checkbox
                  checked={hasFactoryStickers}
                  onChange={onFactoryStickersChange}
                  className="check-option"
                >
                  Yes
                </Checkbox>
              </div>            
                <label>What year is your watch?</label>
                <Input
                  placeholder="Your Watch Year"
                  value={watchYear}
                  onChange={onWatchYearChange}                 
                  className="select-option"
                >                 
                </Input>
              
              <div className="form-group">
                <label>Is your watch a limited edition?</label>
                <Checkbox
                  checked={isLimitedEdition}
                  onChange={onLimitedEditionChange}
                  className="check-option"
                >
                  Yes
                </Checkbox>
              </div>
              <label>Watch Valuation</label>
              <Input
                placeholder="Enter watch details"
                value={watchValue}
                onChange={handleWatchValueChange}
                className="type-option"
              />
              <Button type="primary" onClick={handleWatchValuation} className="button">
                Valuate Watch
              </Button>
            </div>
          )}
          
          {showSecondSlide && (
            <div className="watch-valuation-result justify-content">
              <h3>Customs Check</h3>
              <div className="form-group">
                <label>
                  If you are currently a resident of the United States of
                  America (the "USA"), please confirm whether you purchased the
                  watch within, and have not exported the watch outside of, the
                  USA:
                </label>
                <div className="radio-group">
                  <div className="radio-option">
                    <input
                      type="radio"
                      name="customsCheck"
                      value="yes"
                      checked={customsCheckOption === "yes"}
                      onChange={handleCustomsCheckChange}
                    />
                    <span>Yes</span>
                  </div>
                  <div className="radio-option">
                    <input
                      type="radio"
                      name="customsCheck"
                      value="no"
                      checked={customsCheckOption === "no"}
                      onChange={handleCustomsCheckChange}
                    />
                    <span>No</span>
                  </div>
                  <div className="radio-option">
                    <input
                      type="radio"
                      name="customsCheck"
                      value="nonResident"
                      checked={customsCheckOption === "nonResident"}
                      onChange={handleCustomsCheckChange}
                    />
                    <span>Not a resident of the USA</span>
                  </div>
                  <div className="radio-option">
                    <input
                      type="radio"
                      name="customsCheck"
                      value="dontKnow"
                      checked={customsCheckOption === "dontKnow"}
                      onChange={handleCustomsCheckChange}
                    />
                    <span>Don't Know</span>
                  </div>
                </div>
              </div>
              <Button
                type="primary"
                className="submit-button"
                onClick={handleNextDetails}
              >
                Next: Your Details
              </Button>
            </div>
          )}
          {showThirdSlide && (
            <div className="your-details justify-content">
              <h3>Your Details</h3>
              <div className="form-group">
                <label>First Name</label>
                <Input placeholder="Enter First Name" />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <Input placeholder="Enter Last Name" />
              </div>
              <div className="form-group">
                <label>Email</label>
                <Input placeholder="Enter Email" />
              </div>
              <div className="form-group">
                <label>Telephone</label>
                <Input placeholder="Enter Telephone Number" />
              </div>
              <div className="form-group">
                <label>Sell Method</label>
                <Input value={sellMethod} placeholder="Enter Sell Method" />
              </div>
              <div className="form-group">
                <label>Original Box</label>
                <Checkbox
                  checked={hasOriginalBox}
                  onChange={handleOriginalBoxChange}
                >
                  Yes
                </Checkbox>
              </div>

              <div className="form-group">
                <Button type="primary" className="submit-button">
                  Submit
                </Button>
              </div>
            </div>
          )}
        </div>
      </Content>
    </Layout>
  );
}
