import React, { useState, useEffect } from "react";
import {useNavigate } from "react-router-dom";
import {
  Layout,
  theme,
  Input,
  Button,
  Select,
  Checkbox,
} from "antd";
import "../styles/sell-page.css";
import { useSellContext } from "../context/sellContext";
const {Content } = Layout;
export default function SellPage() {
  const navigate = useNavigate();
  const { updateSellForm, watchForm } = useSellContext(); 
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [initialOffer, setInitialOffer] = useState("");

  //-------------------calculate----------------------------

  const [minimumServicingFee, setMinimumServicingFee] = useState(0); 
  const [total, setTotal] = useState(0);


  //-------------------end calculate -----------------------
  const [showFirstSlide, setShowFirstSlide] = useState(true);
  const [showSecondSlide, setShowSecondSlide] = useState(false);
  const [showThirdSlide, setShowThirdSlide] = useState(false);
  const [sellMethod, setSellMethod] = useState("");
  const [hasOriginalBox, setHasOriginalBox] = useState(false);
  const [hasOriginalPapers, setHasOriginalPapers] = useState(false);
  const [purchasedFromWatchfinder, setPurchasedFromWatchfinder] =
    useState(false);
  const [hasFactoryStickers, setHasFactoryStickers] = useState(false);
  const [isLimitedEdition, setIsLimitedEdition] = useState(false);
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
    console.log("initialOffer:", initialOffer);

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

  const handleOriginalBoxChange = () => {
    setHasOriginalBox(!hasOriginalBox);
  };

  const handleCustomsCheckChange = (e) => {
    setCustomsCheckOption(e.target.value);
  };
  const handleFormSubmit = async () => {
    try {
      // Tạo đối tượng mới chứa tất cả thông tin từ form
      const newSellForm = {
        initialOffer, // Set initialOffer to watchValue
        sellMethod,
        hasOriginalBox,
        hasOriginalPapers,
        purchasedFromWatchfinder,
        hasFactoryStickers,
        watchYear,
        isLimitedEdition,
        customsCheckOption,
        minimumServicingFee,
        total,
      };

      // Cập nhật sellPage trong context với đối tượng mới
      updateSellForm(newSellForm);
      // kiểm tra
      console.log('Submitting form with data:', newSellForm);

      // Chuyển hướng người dùng đến /sellPage
      navigate('/lastActionSell');
    } catch (error) {
      console.error('Error submitting form:', error);
      // Xử lý lỗi nếu có
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

  //-----------------------
  // Kiểm tra watchForm và cập nhật phí dịch vụ tối thiểu
    useEffect(() => {
      if (watchForm !== null) {
        // Nếu watchForm không null, cập nhật phí dịch vụ tối thiểu là 100
        setMinimumServicingFee(100);
      } else {
        // Nếu watchForm null, cập nhật phí dịch vụ tối thiểu là 200
        setMinimumServicingFee(200);
      }
    }, [watchForm]);

  //-----------------------

  //-----------------------
  // Địa chỉ hình ảnh đồng hồ và tên thương hiệu
  const watchInfo = {
    brand: watchForm?.brand?.name || "",
    image: watchForm?.model?.image || "",
  };

  // Render phần thông tin đồng hồ
  const renderWatchInfo = () => (
    <div className="watch-info">
      <img src={watchInfo.image} alt={watchInfo.brand} />
      <h3>{watchInfo.brand}</h3>
    </div>
  );
  //-----------------------

  return (
    <Layout>
      
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
              {/* Hiển thị thông tin đồng hồ */}
            {renderWatchInfo()}
              <h2>About your watch</h2>
              <div className="form-group">
              <label>You want to Sell and Appraise or just Appraise your watch?</label>

                <Select
                  value={sellMethod}
                  onChange={onSellMethodChange}
                  style={{ width: "100%" }}
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
                placeholder="Enter your initialOffer: "
                value={initialOffer}
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
                <div className="radio-group-form2">
                  <div className="radio-option-form2">
                    <input
                      type="radio"
                      name="customsCheck"
                      value="yes"
                      checked={customsCheckOption === "yes"}
                      onChange={handleCustomsCheckChange}
                    />
                    <span>Yes</span>
                  </div>
                  <div className="radio-option-form2">
                    <input
                      type="radio"
                      name="customsCheck"
                      value="no"
                      checked={customsCheckOption === "no"}
                      onChange={handleCustomsCheckChange}
                    />
                    <span>No</span>
                  </div>
                  <div className="radio-option-form2">
                    <input
                      type="radio"
                      name="customsCheck"
                      value="nonResident"
                      checked={customsCheckOption === "nonResident"}
                      onChange={handleCustomsCheckChange}
                    />
                    <span>Not a resident of the USA</span>
                  </div>
                  <div className="radio-option-form2">
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
              <div>
                <Button type="primary" className="back-button" onClick={handleBackToFirstSlide}>
                  Back
                </Button>
                <Button
                  type="primary"
                  className="submit-button"
                  onClick={handleNextDetails}
                >
                  Next: Your Details
                </Button>
              </div>
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
              <div>
                <Button type="primary"
                  className="back-button"
                  onClick={handleBackToSecondSlide}
                >
                  Back
                </Button>
                <Button type="primary" className="submit-button" onClick={handleFormSubmit}>
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

