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

  function logout(){
    setToken(null)
    setCurrentUser(null)
  }

  if (loading) return <p>Loading...</p>

  return (
    <Router>
      <Navbar currentUser={currentUser} logout={logout} />
      <AppRoutes login={login} signup={signup} currentUser={currentUser} />
    </Router>
  )
}

export default App