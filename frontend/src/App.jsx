import React, { useState, useEffect} from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import {jwtDecode} from "jwt-decode"
import JoblyApi from './api/JoblyApi'
import Navbar from './components/Navbar'
import AppRoutes from './AppRoutes'
import useLocalStorage from "./hooks/useLocalStorage"

const App = () => {
  const [token, setToken] = useLocalStorage("jobly-token")
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchCurrentUser() {
      if (!token){
        setCurrentUser(null)
        return
      }
      setLoading(true)

      try {
        const { username } = jwtDecode(token)
        JoblyApi.token = token
        const user = await JoblyApi.getUser(username)
        setCurrentUser(user)
      } catch(err){
        console.error("Error fetching user info: ", err)
        setCurrentUser(null)
      } finally {
        setLoading(false)
      }
    }

    fetchCurrentUser()
  }, [token])

  async function updateUser(userData){
    try {
      const updatedUser = await JoblyApi.updateUser(currentUser.username, userData)
      setCurrentUser(updatedUser)
    } catch (err) {
      console.error("Error updating user:", err)
      throw err.response?.data?.error?.message || [err.message]
    }
  }

  async function login(loginData){
    try {
      const token = await JoblyApi.login(loginData)
      setToken(token)
    } catch (err) {
      console.error("Login faield", err)
    }
  }

  async function signup(signupData){
    console.log("Signup data: ", signupData);
    try {
      const token = await JoblyApi.signup(signupData)
      console.log("Signup successful, received token", token);
      setToken(token)
    } catch(err){
      console.error("Sign up failed in App.jsx ", err.response?.data?.err?.message || err.message)
      throw err
    }
  }

  async function applyToJob(jobId){
    try {
      setCurrentUser((user) => ({
        ...user,
        applications: [...user.applications, appliedJob]
      }))
      return appliedJob
    } catch (error) {
      console.error("Error applying to job:", err);
      throw err.response?.data?.error?.message || [err.message]
    }
  }

  function logout(){
    setToken(null)
    setCurrentUser(null)
  }

  if (loading) return <p>Loading...</p>

  return (
    <Router>
      <Navbar currentUser={currentUser} logout={logout} />
      <AppRoutes login={login} signup={signup} currentUser={currentUser} updateUser={updateUser} applyToJob={applyToJob} />
    </Router>
  )
}

export default App