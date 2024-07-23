import React, { useEffect, useState } from "react";
import { Input, Select, Image, message, Avatar } from "antd";
import ProductDataForm from "../components/appraiseAndSell/ProductDataForm";
import Steps from "../components/appraiseAndSell/Steps";
import ScheduleForm from "../components/appraiseAndSell/ScheduleForm";
import Summary from "../components/appraiseAndSell/Summary";

export default function AppraiseAndSell() {
  const [step, setStep] = useState(0);
  const [productResult, setProductResult] = useState();
  const [dateRangeResult, setDateRangeResult] = useState();

  useEffect(() => {
    const temp = sessionStorage.tempProduct
      ? JSON.parse(sessionStorage.tempProduct)
      : null;
    if (temp)
      if (sessionStorage.appraisalSucceeded) {
        message.success({
          key: "succeeded",
          content: (
            <p className="inline">
              Your request on <Avatar src={temp.image} alt="" size={32} />{" "}
              <span className="font-semibold">{temp.name}</span> has been
              recorded. Updates will be shown in your timepiece management.
            </p>
          ),
          duration: 8,
        });
        sessionStorage.removeItem("appraisalSucceeded");
        sessionStorage.removeItem("tempProduct");
      }
  }, []);

  return (
    <div className={`w-full lg:w-2/3 flex flex-col items-center gap-8 mt-8`}>
      <Steps currentStep={step} setStep={setStep} />
      <ProductDataForm
        currentStep={step}
        setStep={setStep}
        setProductResult={setProductResult}
      />
      <ScheduleForm
        currentStep={step}
        setStep={setStep}
        setDateRangeResult={setDateRangeResult}
      />
      <Summary
        product={productResult}
        currentStep={step}
        setStep={setStep}
        dateRange={dateRangeResult}
      />
    </div>
  );
}
