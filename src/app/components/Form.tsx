"use client";

import React, { useState } from "react";
import "./../globals.css";

const Form = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    jobTitle: "",
    companyName: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="form-page">
      <div className="form-content">
        <div className="form-intro">
          <h1>
            Let's Move Forward,{" "}
            <span className="highlight-green">Together</span>
          </h1>
          <p>
            Starting the journey towards revenue transformation starts with a
            single step. Let's talk.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="form-container">
          <h2>How can we help you?</h2>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name*"
            className="form-input"
          />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name*"
            className="form-input"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email*"
            className="form-input"
          />
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            placeholder="Job Title*"
            className="form-input"
          />
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Company Name*"
            className="form-input"
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="How can we help you? Let us know."
            className="form-textarea"
          />
          <div className="newsletter">
            <input type="checkbox" name="newsletter" id="newsletter" />
            <label htmlFor="newsletter">
              Sign up for the <span className="highlight">HeroChain</span>{" "}
              newsletter
            </label>
          </div>
          <button type="submit" className="form-submit">
            Submit
          </button>
        </form>
      </div>
      <div className="form-image">
        <img src="/people-positive.jpg" />
      </div>
    </div>
  );
};

export default Form;
