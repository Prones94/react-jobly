import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignupForm = ({ signup}) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  })
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleChange = e => {
    const { name, value } = e.target
    setFormData((data) => ({ ...data, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("Submitting signup form with data", formData);
    try {
      await signup(formData)
      console.log("Signup successful, navigating to homepage");
      navigate("/")
    } catch (err) {
      console.error("Signup failed: ", err.response?.data?.error?.message || err.message);
      setError(err.response?.data?.error?.message || "Signup failed.")
    }
  }

  return (
    <form onSubmit={handleSubmit}>
    {error && <p style={{ color: "red" }}>{error}</p>}
      <label htmlFor="username">Username</label>
      <input name="username" value={formData.username} onChange={handleChange} autoComplete="username" />
      <label htmlFor="password">Password</label>
      <input type="password" name="password" value={formData.password} onChange={handleChange} autoComplete="new-password"/>
      <label htmlFor="firstName">First Name</label>
      <input name="firstName" value={formData.firstName} onChange={handleChange} autoComplete="given-name" />
      <label htmlFor="lastName">Last Name</label>
      <input name="lastName" value={formData.lastName} onChange={handleChange} autoComplete="family-name"/>
      <label htmlFor="email">Email</label>
      <input name="email" value={formData.email} onChange={handleChange} autoComplete="email" />
      <button type="submit">Sign Up</button>
    </form>
  )
}

export default SignupForm