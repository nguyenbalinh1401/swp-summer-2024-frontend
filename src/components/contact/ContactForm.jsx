import React, { useState, useEffect } from "react";
import styles from "../style/ContactStyle.module.css";
export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  // useEffect(() => {
  //   fetch("http://localhost:3000/contact/report")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setProducts(data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching Contact", error);
  //     });
  // }, []);
  return (
    <div className={styles.containerContact}>
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit} className="form-contact">
        <label htmlFor="name" className="label-contact">
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <div>
          <label htmlFor="email" className="label-contact">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="message" className="label-contact">
            Message:
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="button-contact">
          Submit
        </button>
      </form>
    </div>
  );
}
