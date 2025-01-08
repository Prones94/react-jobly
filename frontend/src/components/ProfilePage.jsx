import React, { useState } from 'react';

// Profile Page
const ProfilePage = ({currentUsre, updateUser}) => {
  const [formData, setFormData] = useState({
    username: currentUser.username,
    firstName: currentUser.firstName || "",
    lastName: currentUser.lastName || "",
    email: currentUser.email || "",
    password: "",
  })
  const [formErrors, setFormErrors] = useState([])
  const [saveConfirmed, setSaveConfirmed] = useState(false)

  function handleChange(e){
    const { name, value } = e.target
    setFormDat((data) => ({ ...data, [name]: value }))
  }

  async function handleSubmit(e){
    e.preventDefault()
    setFormErrors([])
    setSaveConfirmed(false)

    try {
      const updatedUser = await updateUser(formData)
      setSaveConfirmed(true)
    } catch(err){
      setFormErrors(err)
    }
  }
  return (
    <div>
      <h1>Profile</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username (read-only):</label>
          <input
            name="username"
            value={formData.username}
            disabled
          />
        </div>

        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="password">Confirm Password to Save:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        {formErrors.length > 0 && (
          <p style={{ color: "red" }}>
            {formErrors.join(", ")}
          </p>
        )}

        {saveConfirmed && (
          <p style={{ color: "green" }}>Profile updated successfully!</p>
        )}

        <button type="submit">Save Changes</button>
      </form>
    </div>
  )
}

export default ProfilePage