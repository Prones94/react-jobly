// src/components/SignupForm.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignupForm({ signup }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  });
  const [formErrors, setFormErrors] = useState([]);
  const navigate = useNavigate();

  async function handleSubmit(evt) {
    evt.preventDefault();
    const result = await signup(formData);
    if (result.success) {
      navigate("/");
    } else {
      setFormErrors(result.error);
    }
  }

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  }

  return (
    <form onSubmit={handleSubmit}>
      {formErrors.length ? <p>{formErrors.join(", ")}</p> : null}
      {/* Form fields */}
      <label htmlFor="username">Username:</label>
      <input name="username" value={formData.username} onChange={handleChange} />
      {/* ... other form fields */}
      <button>Sign Up</button>
    </form>
  );
}

export default SignupForm;
