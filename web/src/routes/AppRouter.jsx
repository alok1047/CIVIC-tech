import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Pages
import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/LoginPage';
import CitizenDashboard from '../pages/citizen/CitizenDashboard';
import AdminDashboard from '../pages/admin/AdminDashboard';
import NotFoundPage from '../pages/NotFoundPage';
import SubmitReportPage from '../pages/citizen/SubmitReportPage'; 

// Import the ProtectedRoute component
import ProtectedRoute from './ProtectedRoute'; // <-- IMPORT

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* --- PROTECTED ROUTES --- */}

        {/* Citizen Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={['Citizen']}>
              <CitizenDashboard />
            </ProtectedRoute>
          }
        />

           {/* Submit Report Page -- ADD THIS ROUTE */}
           <Route
          path="/submit-report"
          element={
            <ProtectedRoute allowedRoles={['Citizen']}>
              <SubmitReportPage />
            </ProtectedRoute>
          }
        />


        {/* Admin Dashboard */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={['Admin', 'Staff']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        
        {/* Catch-all Not Found Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;