import { Avatar, Input } from "antd";
import React, { useEffect, useState } from "react";
import CurrencySplitter from "../../assistants/currencySpliter";
import axios from "axios";
import { Select } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function CartCheckout({ getCheckoutInfo }) {
  const [checkoutInfo, setCheckoutInfo] = useState({});
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [address, setAddress] = useState("");

  const getProvincesData = async () => {
    await axios
      .get(`http://localhost:3000/addressApi/provinces`)
      .then((res) => {
        const provincesList = res.data.map((item) => ({
          ...item,
          label: item.province_name,
          value: JSON.stringify({
            id: item.province_id,
            name: item.province_name,
          }),
        }));
        setProvinces(provincesList);
      });
  };

  const checkoutSchema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    phone: Yup.string().required().min(9).max(11),
    address: Yup.string().required(),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      address: address,
    },
    validationSchema: checkoutSchema,
    onSubmit: async (values) => {
      console.log("Form values: ", values);
    },
  });

  useEffect(() => {
    getProvincesData();
  }, []);

  const handleSelectProvince = async (value) => {
    const selectedProvince = JSON.parse(value);
    console.log("Select province value: ", JSON.parse(value));
    await axios
      .get(`http://localhost:3000/addressApi/districts/${selectedProvince.id}`)
      .then((res) => {
        const districtsList = res.data.map((item) => ({
          ...item,
          label: item.district_name,
          value: JSON.stringify({
            id: item.district_id,
            name: item.district_name,
          }),
        }));
        setDistricts(districtsList);
        setAddress(selectedProvince.name);
      })
      .catch((err) => console.log(err));
  };

  const handleSelectDistrict = async (value) => {
    const selectedDistrict = JSON.parse(value);
    await axios
      .get(`http://localhost:3000/addressApi/wards/${selectedDistrict.id}`)
      .then((res) => {
        const wardsList = res.data.map((item) => ({
          ...item,
          label: item.ward_name,
          value: JSON.stringify({
            id: item.ward_id,
            name: item.ward_name,
          }),
        }));
        setWards(wardsList);
      })
      .catch((err) => console.log(err));
    const addressArray = address.split(",");
    setAddress(
      selectedDistrict.name +
        ", " +
        addressArray[addressArray.length - 1].trim()
    );
  };

  const handleSelectWard = (value) => {
    const selectedWard = JSON.parse(value);
    const addressArray = address.split(",");
    setAddress(
      selectedWard.name +
        ", " +
        addressArray[addressArray.length - 2].trim() +
        ", " +
        addressArray[addressArray.length - 1].trim()
    );
  };

  const handleEnterDetailedAddress = (e) => {
    const detailedAddress = e.target.value;
    const addressArray = address.split(",");
    if (detailedAddress.length === 0)
      setAddress(
        addressArray[addressArray.length - 3].trim() +
          ", " +
          addressArray[addressArray.length - 2].trim() +
          ", " +
          addressArray[addressArray.length - 1].trim()
      );
    else
      setAddress(
        detailedAddress.replace(/[^\S\r\n]{2,}/, " ").trim() +
          ", " +
          addressArray[addressArray.length - 3].trim() +
          ", " +
          addressArray[addressArray.length - 2].trim() +
          ", " +
          addressArray[addressArray.length - 1].trim()
      );
  };

  return (
    <div className="w-full flex flex-col items-start gap-4 p-8 rounded-xl text-teal-900 bg-slate-100">
      <p className="font-black text-3xl">CHECKOUT INFO</p>

      <form
        onSubmit={formik.handleSubmit}
        className="w-full flex flex-col items-center justify-start gap-2"
      >
        <div className="w-full flex items-center justify-start">
          <p className="min-w-fit pr-6">Email:</p>
          <Input
            name="email"
            placeholder="Enter email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
        </div>

        <div className="w-full flex items-center justify-start">
          <p className="min-w-fit pr-4">Phone:</p>
          <Input
            name="phone"
            placeholder="Enter phone number"
            maxLength={12}
            onChange={formik.handleChange}
            value={formik.values.phone}
          />
        </div>

        <div className="w-full flex items-center justify-start">
          <p className="min-w-fit pr-4">Address:</p>
          <Input.TextArea
            disabled
            name="address"
            placeholder="Select below..."
            value={address}
          />
        </div>

        <div className="w-full flex flex-col items-center justify-start gap-2 md:pl-8">
          <div className="w-full flex items-center justify-between">
            <p className="min-w-fit text-xs pr-4">City / Province:</p>
            <Select
              showSearch
              placeholder=<p className="md:pr-8">Select city or province...</p>
              options={provinces}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .normalize()
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              onSelect={handleSelectProvince}
            />
          </div>

          <div
            className={`w-full flex items-center justify-between ${
              districts.length > 0 ? "inline" : "hidden"
            }`}
          >
            <p className="min-w-fit text-xs pr-4">District:</p>
            <Select
              showSearch
              placeholder=<p className="pr-8">Select district...</p>
              options={districts}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .normalize()
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              onSelect={handleSelectDistrict}
              className="min-w-48"
            />
          </div>

          <div
            className={`w-full flex items-center justify-between ${
              wards.length > 0 ? "inline" : "hidden"
            }`}
          >
            <p className="min-w-fit text-xs pr-4">Ward:</p>
            <Select
              showSearch
              placeholder=<p className="pr-8">Select ward...</p>
              options={wards}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .normalize()
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              onSelect={handleSelectWard}
              className="min-w-48"
            />
          </div>

          <div
            className={`w-full flex items-center justify-start ${
              wards.length > 0 ? "inline" : "hidden"
            }`}
          >
            <p className="min-w-fit text-xs pr-4">Detailed address:</p>
            <Input
              placeholder="Enter detailed address (No, Street,...)"
              onBlur={handleEnterDetailedAddress}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
