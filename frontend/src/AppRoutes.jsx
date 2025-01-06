import React from 'react'
import { Routes, Route } from "react-router-dom"
import CompaniesPage from './components/CompaniesPage'
import CompanyPage from './components/CompanyPage'
import CompanyList from './components/CompanyList'
import CompanyDetail from './components/CompanyDetail'
import HomePage from './components/HomePage'
import JobsPage from './components/JobsPage'
import LoginPage from './components/LoginPage'
import ProfilePage from './components/ProfilePage'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/companies" element={<CompanyList />} />
      <Route path="/companies/:handle" element={<CompanyDetail />} />
      <Route path="/jobs" element={<JobsPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  )
}

export default AppRoutes

