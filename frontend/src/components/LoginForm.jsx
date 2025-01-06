import React, { useState } from 'react';

const LoginForm = ({login}) => {
  const [formData, setFormData] = useState({ username: "", password: ""})

  const handleChange = e => {
    const { name, value } = e.target
    setFormData((data) => ({ ...data, [name]: value}))
  }

  const handleSubmit = e => {
    e.preventDefault()
    login(formData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username</label>
      <input type="text" name="username" id="username" value={formData.username} onChange={handleChange} autoComplete="username"/>
      <label htmlFor="password">Password</label>
      <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} autoComplete="current-password"/>
      <button type="submit">Login</button>
    </form>
  )
}

export default LoginForm