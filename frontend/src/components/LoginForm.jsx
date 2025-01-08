// src/components/LoginForm.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm({ login }) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [formErrors, setFormErrors] = useState([]);
  const navigate = useNavigate();

  async function handleSubmit(evt) {
    evt.preventDefault();
    const result = await login(formData);
    if (result.success) {
      navigate("/");
    } else {
      setFormErrors(result.error);
    }
  }

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  }

  return (
    <form onSubmit={handleSubmit}>
      {formErrors.length ? <p>{formErrors.join(", ")}</p> : null}
      <label htmlFor="username">Username:</label>
      <input name="username" value={formData.username} onChange={handleChange} />
      <label htmlFor="password">Password:</label>
      <input
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
      />
      <button>Login</button>
    </form>
  );
}

export default LoginForm;
