import React, { useEffect, useState } from "react";
import { Input, Select, Image, message, Avatar } from "antd";
import PlaceholderImage from "../../assets/images/profile/placeholder_image.svg";
import { imageDb } from "../../firebase-config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import UpdatePhoneModal from "./UpdatePhoneModal";

export default function ProductDataForm({
  currentStep,
  setStep,
  setProductResult,
}) {
  const user = sessionStorage.signInUser
    ? JSON.parse(sessionStorage.signInUser)
    : null;

  if (!user) {
    window.location.href = "/signin";
  }

  const tempProduct = sessionStorage.tempProduct
    ? JSON.parse(sessionStorage.tempProduct)
    : null;

  const [completeProduct, setCompleteProduct] = useState(null);
  const [name, setName] = useState(tempProduct ? tempProduct.name : "");
  const [brand, setBrand] = useState(tempProduct ? tempProduct.brand : "");
  const [price, setPrice] = useState(tempProduct ? tempProduct.price : "");
  const [description, setDescription] = useState(
    tempProduct ? tempProduct.description : ""
  );
  const [image, setImage] = useState(tempProduct ? tempProduct.image : "");
  const [type, setType] = useState(tempProduct ? tempProduct.type : "");
  const [dialColor, setDialColor] = useState(
    tempProduct ? tempProduct.dialColor : ""
  );
  const [dialColorList, setDialColorList] = useState(
    tempProduct ? tempProduct.dialColor.split(", ") : []
  );
  const [waterResistance, setWaterResistance] = useState(
    tempProduct ? tempProduct.waterResistance : null
  );

  const [box, setBox] = useState(tempProduct ? tempProduct.box : null);
  const [papers, setPapers] = useState(tempProduct ? tempProduct.papers : null);

  const [caseMaterial, setCaseMaterial] = useState(
    tempProduct ? tempProduct.caseMaterial : ""
  );
  const [caseSize, setCaseSize] = useState(
    tempProduct ? tempProduct.caseSize : ""
  );
  const [yearOfProduction, setYearOfProduction] = useState(
    tempProduct ? tempProduct.yearOfProduction : ""
  );
  const [pastUsageTime, setPastUsageTime] = useState(
    tempProduct ? tempProduct.pastUsageTime : ""
  );
  const [remainingInsurance, setRemainingInsurance] = useState(
    tempProduct ? tempProduct.remainingInsurance : ""
  );

  const [isValidForm, setIsValidForm] = useState(false);

  const [phoneWarning, setPhoneWarning] = useState(false);

  const watchTypeOptions = [
    {
      label: "Analogue",
      value: "Analogue",
    },
    {
      label: "Automatic",
      value: "Automatic",
    },
    {
      label: "Chronograph",
      value: "Chronograph",
    },
    {
      label: "Digital",
      value: "Digital",
    },
    {
      label: "Hybrid",
      value: "Hybrid",
    },
    {
      label: "Mechanical",
      value: "Mechanical",
    },
    {
      label: "Quartz",
      value: "Quartz",
    },
    {
      label: "Smartwatch",
      value: "Smartwatch",
    },
  ];

  const dialColorOptions = [
    {
      label: "White",
      value: "White",
    },
    {
      label: "Silver",
      value: "Silver",
    },
    {
      label: "Golden",
      value: "Golden",
    },
    {
      label: "Black",
      value: "Black",
    },
    {
      label: "Blue",
      value: "Blue",
    },
    {
      label: "Dark blue",
      value: "Dark blue",
    },
    {
      label: "Champagne",
      value: "Champagne",
    },
    {
      label: "Navy",
      value: "Navy",
    },
    {
      label: "Green",
      value: "Green",
    },
  ];

  const waterResistanceOptions = [
    {
      label: "Not water-resistant",
      value: "0",
    },
    {
      label: "30 (3 ATM)",
      value: "30",
    },
    {
      label: "50 (5 ATM)",
      value: "50",
    },
    {
      label: "100 (10 ATM)",
      value: "100",
    },
    {
      label: "150 (15 ATM)",
      value: "150",
    },
    {
      label: "200 (20 ATM)",
      value: "200",
    },
    {
      label: "300 (30 ATM)",
      value: "300",
    },
  ];

  const caseMaterialOptions = [
    {
      label: "Stainless Steel",
      value: "Stainless Steel",
    },
    {
      label: "Silver",
      value: "Silver",
    },
    {
      label: "Gold",
      value: "Gold",
    },
    {
      label: "Titanium",
      value: "Titanium",
    },
    {
      label: "Bronze",
      value: "Bronze",
    },
    {
      label: "PVD",
      value: "PVD",
    },
    {
      label: "Plastic",
      value: "Plastic",
    },
    {
      label: "Base metal",
      value: "Base metal",
    },
    {
      label: "Silicon",
      value: "Silicon",
    },
  ];

  const mergeDialColor = (value) => {
    setDialColorList(value);
    let temp = "";
    value.forEach((item, index) => {
      if (index !== value.length - 1) temp += `${item}, `;
      else temp += item;
    });
    setDialColor(temp);
  };

  const handleConfirmForm = () => {
    //Complete product data
    const productData = {
      owner: user.id,
      name,
      brand,
      price: price === 0 ? 0 : parseFloat(price),
      description,
      image,
      type,
      dialColor,
      waterResistance: parseInt(waterResistance),
      caseMaterial,
      caseSize: caseSize.length === 0 ? 0 : parseInt(caseSize),
      box,
      papers,
      yearOfProduction:
        yearOfProduction.length === 0 ? 0 : parseInt(yearOfProduction),
      pastUsageTime: pastUsageTime.length === 0 ? 0 : parseInt(pastUsageTime),
      remainingInsurance:
        remainingInsurance.length === 0 ? 0 : parseInt(remainingInsurance),
    };
    console.log("Product: ", productData);
    setCompleteProduct(productData);
    sessionStorage.setItem("tempProduct", JSON.stringify(productData));

    if (user.phone.length === 0) {
      setPhoneWarning(true);
    } else {
      setProductResult(productData);
      setStep(currentStep + 1);
      window.scrollTo({ top: 80, behavior: "smooth" });
    }
  };

  const resetData = () => {
    setImage("");
    setName("");
    setBrand("");
    setPrice("");
    setImage("");
    setDescription("");
    setType(null);
    setDialColorList([]);
    setWaterResistance(null);
    setCaseMaterial(null);
    setCaseSize("");
    setBox(null);
    setPapers(null);
    setYearOfProduction("");
    setPastUsageTime("");
    setRemainingInsurance("");
  };

  const checkFormValidity = () => {
    if (
      image.length > 0 &&
      name.length > 0 &&
      brand.length > 0 &&
      price.length > 0 &&
      price < 100000 &&
      description.length > 0 &&
      type &&
      dialColorList.length > 0 &&
      waterResistance &&
      caseMaterial &&
      caseSize > 0 &&
      (box === true || box === false) &&
      (papers === true || papers === false)
    )
      setIsValidForm(true);
    else setIsValidForm(false);
  };

  useEffect(() => {
    checkFormValidity();
  }, [
    image,
    name,
    brand,
    price,
    description,
    type,
    dialColorList,
    waterResistance,
    caseMaterial,
    caseSize,
    box,
    papers,
  ]);

  const handleFileUpload = async (e) => {
    const uploaded = e.target.files[0];
    if (uploaded) {
      const imgRef = ref(imageDb, `files/${v4()}`);
      uploadBytes(imgRef, uploaded).then(async (value) => {
        console.log("Uploaded: ", value.metadata);
        setImage(await getDownloadURL(value.ref));
      });
    }
  };

  const handleImageUrl = () => {
    const url = prompt("Enter new image url:");
    if (
      (url && url.match(/([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif))/i)) ||
      url.match(/^data:image\/[a-z]+;base64,/)
    )
      setImage(url);
    else {
      message.error({
        key: "invalidImage",
        content: "Invalid image URL. Please try again!",
        duration: 5,
      });
    }
  };

  return (
    <div
      className={`w-full border border-gray-400 rounded-[30px] px-2 py-8 my-8 ${
        currentStep !== 0 && "hidden"
      }`}
    >
      <p className="w-fit mx-auto mb-8 font-bold text-white text-[1.2em] bg-teal-900 px-4 py-2 rounded-xl">
        WATCH INFORMATION FORM
      </p>
      <UpdatePhoneModal open={phoneWarning} setOpen={setPhoneWarning} />

      <div className="w-full flex items-start justify-center gap-8 p-8 font-montserrat overflow-x-hidden">
        <div className="flex flex-col items-center justify-start gap-8">
          {image.length === 0 && (
            <img src={PlaceholderImage} className="w-48 h-48 rounded-full" />
          )}
          <Image src={image} alt="" width={300} preview={true} />

          <button
            onClick={() => {
              document.getElementById("image-upload")?.click();
            }}
            className="px-4 py-2 rounded-lg bg-sky-700 hover:bg-sky-800 text-white font-semibold"
          >
            Upload image
          </button>
          <p className="text-gray-500 text-[0.8em]">
            or{" "}
            <span
              onClick={handleImageUrl}
              className="underline cursor-pointer hover:text-black"
            >
              use a URL instead
            </span>
          </p>
          <input
            id="image-upload"
            type="file"
            onChange={handleFileUpload}
            accept="image/*"
            hidden
          />
        </div>

        <div className="w-2/3 flex flex-col items-start gap-2">
          <div className="flex flex-col items-start justify-start gap-1">
            <p className="text-[0.7em] text-sky-800 font-semibold pl-2">
              Name <span className={`text-red-600`}>*</span>
            </p>
            <input
              type="text"
              placeholder="e.g. Casio Stainless Steel Classic Digital Watch"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-[35em] border p-2 rounded-xl"
            />
          </div>
          <div className="flex flex-col items-start justify-start gap-1">
            <p className="text-[0.7em] text-sky-800 font-semibold pl-2">
              Brand <span className={`text-red-600`}>*</span>
            </p>
            <input
              placeholder="e.g. Casio"
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-[20em] border p-2 rounded-xl"
            />
          </div>
          <div className="flex flex-col items-start justify-start gap-1">
            <p className="text-[0.7em] text-sky-800 font-semibold pl-2">
              Price <span className="font-light">($)</span>{" "}
              <span className={`text-red-600`}>*</span>
            </p>
            <div className="flex items-center gap-4">
              <input
                placeholder="e.g. 34.56"
                type="text"
                value={price}
                onChange={(e) => {
                  if (e.target.value.length === 0) setPrice("");
                  else if (
                    e.target.value.match(/^[0-9]*$/) &&
                    !e.target.value.startsWith("0")
                  )
                    setPrice(e.target.value);
                }}
                className="w-[10em] border p-2 rounded-xl"
              />
              <p
                className={`${price < 100000 && "hidden"} text-xs text-red-500`}
              >
                Price that is greater than $100,000 is invalid!
              </p>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start gap-1">
            <p className="text-[0.7em] text-sky-800 font-semibold pl-2">
              Description <span className={`text-red-600`}>*</span>
            </p>
            <Input.TextArea
              autoSize={{
                minRows: 4,
                maxRows: 10,
              }}
              placeholder="Enter description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-[35em] border p-2 font-montserrat rounded-xl"
            />
          </div>

          <div className="w-full flex items-center justify-between gap-1">
            <div className="flex flex-col items-start justify-start gap-1">
              <p className="text-[0.7em] text-sky-800 font-semibold pl-2">
                Type <span className={`text-red-600`}>*</span>
              </p>
              <Select
                showSearch
                placeholder="Select type..."
                popupMatchSelectWidth={200}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                value={type}
                options={watchTypeOptions}
                onSelect={(value) => {
                  setType(value);
                }}
                className="min-w-[8em]"
              />
            </div>
            <div className="flex flex-col items-start justify-start gap-1">
              <p className="text-[0.7em] text-sky-800 font-semibold pl-2">
                Dial color <span className={`text-red-600`}>*</span>
              </p>
              <Select
                mode="tags"
                maxTagTextLength={5}
                maxCount={3}
                placeholder="Select dial color(s)... (maximum 3)"
                popupMatchSelectWidth={200}
                value={dialColorList}
                options={dialColorOptions}
                onChange={mergeDialColor}
                className="min-w-[8em]"
              />
            </div>
            <div className="flex flex-col items-start justify-start gap-1">
              <p className="text-[0.7em] text-sky-800 font-semibold pl-2">
                Water resistance <span className="font-light">(mm)</span>{" "}
                <span className={`text-red-600`}>*</span>
              </p>
              <Select
                placeholder="Select water resistance level..."
                popupMatchSelectWidth={200}
                value={waterResistance}
                options={waterResistanceOptions}
                onSelect={(value) => {
                  setWaterResistance(value);
                }}
                className="min-w-[8em]"
              />
            </div>
          </div>

          <div className="w-full flex items-center justify-between">
            <div className="grow flex flex-col items-start justify-start gap-1">
              <p className="text-[0.7em] text-sky-800 font-semibold pl-2">
                Case material <span className={`text-red-600`}>*</span>
              </p>
              <Select
                showSearch
                placeholder="Select case material..."
                popupMatchSelectWidth={200}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                value={caseMaterial}
                options={caseMaterialOptions}
                onSelect={(value) => {
                  setCaseMaterial(value);
                }}
                className="min-w-[10em]"
              />
            </div>
            <div className="grow flex flex-col items-start justify-start gap-1">
              <p className="text-[0.7em] text-sky-800 font-semibold pl-2">
                Case size <span className="font-light">(mm)</span>{" "}
                <span className={`text-red-600`}>*</span>
              </p>
              <input
                placeholder="e.g. 42, 50"
                value={caseSize}
                maxLength={3}
                onChange={(e) => {
                  if (e.target.value.length === 0) setCaseSize("");
                  else if (e.target.value.match(/^[0-9]*$/))
                    setCaseSize(e.target.value);
                }}
                className="w-[10em] border p-2 rounded-xl"
              />
            </div>
            <div className="grow"></div>
          </div>

          <div className="w-full flex flex-col items-start justify-start gap-2 pb-4">
            <div className="w-full flex items-center justify-between gap-8">
              <div className="w-1/2 flex flex-col items-start justify-start gap-1">
                <p className="text-[0.7em] text-sky-800 font-semibold pl-2">
                  Box <span className={`text-red-600`}>*</span>
                </p>
                <div className="w-full flex items-center justify-start">
                  <button
                    onClick={() => {
                      setBox(true);
                    }}
                    className={`${
                      box === true
                        ? "bg-sky-800 text-white"
                        : "text-black hover:bg-slate-100 opacity-70 hover:opacity-100"
                    } grow py-1 border border-gray-300 rounded-l-md duration-200`}
                  >
                    YES
                  </button>
                  <button
                    onClick={() => {
                      setBox(false);
                    }}
                    className={`${
                      box === false
                        ? "bg-sky-800 text-white"
                        : "text-black hover:bg-slate-100 opacity-70 hover:opacity-100"
                    } grow py-1 border border-gray-300 rounded-r-md duration-200`}
                  >
                    NO
                  </button>
                </div>
              </div>
              <div className="w-1/2 flex flex-col items-start justify-start gap-1">
                <p className="text-[0.7em] text-sky-800 font-semibold pl-2">
                  Papers <span className={`text-red-600`}>*</span>
                </p>
                <div className="w-full flex items-center justify-start">
                  <button
                    onClick={() => {
                      setPapers(true);
                    }}
                    className={`${
                      papers === true
                        ? "bg-sky-800 text-white"
                        : "text-black hover:bg-slate-100 opacity-70 hover:opacity-100"
                    } grow py-1 border border-gray-300 rounded-l-md duration-200`}
                  >
                    YES
                  </button>
                  <button
                    onClick={() => {
                      setPapers(false);
                    }}
                    className={`${
                      papers === false
                        ? "bg-sky-800 text-white"
                        : "text-black hover:bg-slate-100 opacity-70 hover:opacity-100"
                    } grow py-1 border border-gray-300 rounded-r-md duration-200`}
                  >
                    NO
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full flex items-center justify-between">
            <div className="flex flex-col items-start justify-start gap-1">
              <p className="text-[0.7em] text-sky-800 font-semibold pl-2">
                Year of manufacture
              </p>
              <input
                placeholder="e.g. 1999, 2024"
                value={yearOfProduction}
                maxLength={4}
                onChange={(e) => {
                  if (e.target.value.length === 0) setYearOfProduction("");
                  else if (
                    e.target.value.match(/^[0-9]*$/) &&
                    parseFloat(e.target.value) < 2025
                  )
                    setYearOfProduction(e.target.value);
                }}
                className="w-[10em] border p-2 rounded-xl"
              />
            </div>
            <div className="flex flex-col items-start justify-start gap-1">
              <p className="text-[0.7em] text-sky-800 font-semibold pl-2">
                Past usage time <span className="font-light">(month)</span>
              </p>
              <input
                placeholder="e.g. 3, 6, 12"
                value={pastUsageTime}
                maxLength={3}
                onChange={(e) => {
                  if (e.target.value.length === 0) setPastUsageTime("");
                  else if (
                    e.target.value.match(/^[0-9]*$/) &&
                    parseFloat(e.target.value) < 240
                  )
                    setPastUsageTime(e.target.value);
                }}
                className="w-[10em] border p-2 rounded-xl"
              />
            </div>
            <div className="flex flex-col items-start justify-start gap-1">
              <p className="text-[0.7em] text-sky-800 font-semibold pl-2">
                Remaining insurance <span className="font-light">(month)</span>
              </p>
              <input
                placeholder="e.g. 3, 6, 12"
                value={remainingInsurance}
                maxLength={3}
                onChange={(e) => {
                  if (e.target.value.length === 0) setRemainingInsurance("");
                  else if (
                    e.target.value.match(/^[0-9]*$/) &&
                    parseFloat(e.target.value) < 240
                  )
                    setRemainingInsurance(e.target.value);
                }}
                className="w-[10em] border p-2 rounded-xl"
              />
            </div>
          </div>
          <p className={`text-xs font-light italic p-2`}>
            Note: Please fulfill every field that is marked by{" "}
            <span className="text-red-500">*</span> and upload an image.
          </p>
        </div>
      </div>

      <div
        className={`w-full flex items-center justify-end gap-8 font-montserrat pr-8`}
      >
        <button onClick={() => resetData()} className="hover:underline">
          Reset
        </button>
        <button
          disabled={!isValidForm}
          onClick={handleConfirmForm}
          className="flex items-center gap-2 pl-8 pr-4 py-2 bg-green-600 hover:bg-green-700 font-semibold text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Next
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="currentColor"
          >
            <path d="M12.1717 12.0005L9.34326 9.17203L10.7575 7.75781L15.0001 12.0005L10.7575 16.2431L9.34326 14.8289L12.1717 12.0005Z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
