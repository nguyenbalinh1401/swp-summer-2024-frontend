import React, { useState, useEffect } from "react";
import { Content } from "antd/es/layout/layout";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [products, setProducts] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = "Name cannot be empty";
    if (!formData.email) {
      newErrors.email = "Email cannot be empty";
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(formData.email)) {
        newErrors.email = "Invalid email format";
      }
    }
    if (!formData.phone) {
      newErrors.phone = "Phone cannot be empty";
    } else {
      const phonePattern = /^\d{8,12}$/;
      if (!phonePattern.test(formData.phone)) {
        newErrors.phone = "Phone number must be between 8 and 12 digits";
      }
    }
    if (!formData.message) newErrors.message = "Please fill your message";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      fetch("http://localhost:3000/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Form submitted:", data);
          window.location.href = "/"; 
          alert("Your message has been sent! Thank you <3"); 
        })
        .catch((error) => {
          console.error("Error submitting form:", error);
        });
    } else {
      setErrors(validationErrors);
    }
  };

  useEffect(() => {
    fetch("http://localhost:3000/contact")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching Contact", error);
      });
  }, []);

  return (
    <div
      className="w-screen max-w-full h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url(https://c.pxhere.com/photos/fd/22/photo-10548.jpg!d)",
      }}
    >
      <div className="flex h-full items-center justify-end pr-10">
        <Content className="w-full max-w-lg bg-white p-8 shadow-md rounded-lg">
          <h1 className="text-xl font-semibold">We'd love to hear from you!</h1>
          <h1 className="text-xl font-semibold">Let's get in touch</h1>
          <form
            onSubmit={handleSubmit}
            className="items-center justify-center space-y-6"
          >
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-600"
              >
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-600"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium text-gray-600"
              >
                Phone:
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-600"
              >
                Message:
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              />
              {errors.message && (
                <p className="text-red-500 text-sm">{errors.message}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-medium text-white bg-[#0A4C52] rounded-lg hover:bg-[#158C98] focus:outline-none focus:ring focus:ring-blue-200"
            >
              Submit
            </button>
          </form>
        </Content>
      </div>
    </div>
  );
}
