import React from 'react'
import { Routes, Route } from "react-router-dom"
import CompaniesPage from './components/CompaniesPage'
import HomePage from './components/HomePage'
import CompanyPage from './components/CompanyPage'
import JobsPage from './components/JobsPage'
import LoginPage from './components/LoginPage'
import ProfilePage from './components/ProfilePage'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/companies" element={<CompaniesPage />} />
      <Route path="/companies/:handle" element={<CompaniesPage />} />
      <Route path="/jobs" element={<JobsPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<LoginPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  )
}

export default AppRoutes

