import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Layout,
  Menu,
  theme,
  message,
  Upload,
  Input,
  Button,
  Select,
  Checkbox,
} from "antd";

import "../components/style/SellStyle.css";

const { Header, Content } = Layout;

const props = {
  name: "file",
  multiple: true,
  action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

const items = ["Home", "Buy", "Sell"].map((label, index) => ({
  key: String(index + 1),
  label:
    label === "Home" ? (
      <Link to={`/`}>{label}</Link>
    ) : (
      <Link to={`/${label.toLowerCase()}`}>{label}</Link>
    ),
}));

export default function Sell() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [watchValue, setWatchValue] = useState("");
  const [showFirstSlide, setShowFirstSlide] = useState(true);
  const [showWatchValuation, setShowWatchValuation] = useState(false);
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
      <Header className="layout-header">
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["3"]}
          items={items}
          className="menu"
        />
      </Header>
      <Content className="content">
        <div
          className="content-inner"
          style={{
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {showFirstSlide && (
            <div className="sell-content">
              <h2>About your watch</h2>
              <div className="form-group">
                <label>How would you like to sell your watch?</label>
                <Select
                  value={sellMethod}
                  onChange={onSellMethodChange}
                  style={{ width: "100%" }}
                >
                  <Select.Option value="outright">Outright Sale</Select.Option>
                  <Select.Option value="trade">Trade In</Select.Option>
                </Select>
              </div>
              <div className="form-group">
                <label>Do you have the original box?</label>
                <Checkbox
                  checked={hasOriginalBox}
                  onChange={onOriginalBoxChange}
                >
                  Yes
                </Checkbox>
              </div>
              <div className="form-group">
                <label>Do you have the original papers?</label>
                <Checkbox
                  checked={hasOriginalPapers}
                  onChange={onOriginalPapersChange}
                >
                  Yes
                </Checkbox>
              </div>
              <div className="form-group">
                <label>Was your watch purchased from Watchfinder?</label>
                <Checkbox
                  checked={purchasedFromWatchfinder}
                  onChange={onWatchfinderChange}
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
                >
                  Yes
                </Checkbox>
              </div>
              <div className="form-group">
                <label>What year is your watch?</label>
                <Select
                  value={watchYear}
                  onChange={onWatchYearChange}
                  style={{ width: "100%" }}
                >
                  <Select.Option value="2022">2022</Select.Option>
                  <Select.Option value="2021">2021</Select.Option>
                </Select>
              </div>
              <div className="form-group">
                <label>Is your watch a limited edition?</label>
                <Checkbox
                  checked={isLimitedEdition}
                  onChange={onLimitedEditionChange}
                >
                  Yes
                </Checkbox>
              </div>
              <h3>Watch Valuation</h3>
              <Input
                placeholder="Enter watch details"
                value={watchValue}
                onChange={handleWatchValueChange}
              />
              <Button type="primary" onClick={handleWatchValuation}>
                Valuate Watch
              </Button>
            </div>
          )}
          {showSecondSlide && (
            <div className="watch-valuation-result">
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
            <div className="your-details">
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
