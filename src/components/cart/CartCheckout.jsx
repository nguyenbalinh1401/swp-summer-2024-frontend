import { Avatar } from "antd";
import React, { useEffect, useState } from "react";
import CurrencySplitter from "../../assistants/currencySpliter";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function CartCheckout({ getCheckoutInfo }) {
  const [checkoutInfo, setCheckoutInfo] = useState({});

  const [provinces, setProvinces] = useState([]);
  const getProvincesData = async () => {
    await axios.get(`https://vapi.vnappmob.com/api/province`).then((res) => {
      console.log("Provinces: ", res.data);
      setProvinces(res.data);
    });
  };

  const checkoutSchema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.email().required(),
    phone: Yup.string().required().min(9).max(11),
    address: Yup.string().required(),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
    validationSchema: checkoutSchema,
    onSubmit: async () => {
        
    }
  });

  useEffect(() => {
    getProvincesData();
  }, []);

  return (
    <div className="w-full flex flex-col items-start gap-4 p-8 rounded-xl text-teal-900 bg-slate-100">
      <p className="font-black text-3xl">CHECKOUT INFO</p>

      <div className="w-full flex flex-col items-center justify-start">
        <div className="w-full flex items-center justify-between">
          <p>Phone number:</p>
          <input type="text" />
        </div>
      </div>
    </div>
  );
}
