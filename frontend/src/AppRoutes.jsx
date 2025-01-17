import React from "react";
import { Routes, Route } from "react-router-dom";
import CompaniesPage from "./components/CompaniesPage";
import CompanyDetail from "./components/CompanyDetail";
import HomePage from "./components/HomePage";
import JobsPage from "./components/JobsPage";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import ProfilePage from "./components/ProfilePage";
import PrivateRoute from "./components/PrivateRoute";

const AppRoutes = ({ login, signup, currentUser }) => {
  return (
    <Routes>
      <Route path="/" element={<HomePage currentUser={currentUser} />} />
      <Route path="/login" element={<LoginForm login={login} />} />
      <Route path="/signup" element={<SignupForm signup={signup} />} />

      <Route element={<PrivateRoute currentUser={currentUser} />}>
        <Route path="/companies" element={<CompaniesPage />} />
        <Route path="/companies/:handle" element={<CompanyDetail />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/profile" element={<ProfilePage currentUser={currentUser} />} />
      </Route>

      <Route path="*" element={<p>Page Not Found</p>} />
    </Routes>
  );
};

export default AppRoutes;
