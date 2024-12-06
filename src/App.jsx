import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Layout } from 'antd';
import AppHeader from './components/Header/AppHeader';
import Home from './components/Home/Home';
import AllCodes from './components/AllCodes';
import Clinics from './components/Clinics';
import DoctorClinicSpecialty from './components/DoctorClinicSpecialty';
import DoctorInfo from './components/DoctorInfo';
import Histories from './components/Histories';
import Invoices from './components/Invoices';
import Markdowns from './components/Markdowns';
import Users from './components/Users';
import Specialties from './components/Specialties';
import Schedules from './components/Schedules';
import AdminDashboard from './components/admin/adminAdmin/AdminDashboard';
import DoctorDashboard from './components/admin/doctorAdmin/DoctorDashboard';
import DetailDoctor from './components/Home/DetailDoctor';
import DetailClinic from './components/Home/DetailClinic';
import DetailSpecialty from './components/Home/DetailSpecialty';
import ManageDoctorSchedule from './components/admin/doctorAdmin/ManageDoctorSchedule';
import ManageDoctorPatients from './components/admin/doctorAdmin/ManageDoctorPatients';

const { Content, Footer } = Layout;

const App = () => {
  const [role, setRole] = useState(() => {
    const storedRole = localStorage.getItem('roleId');
    return storedRole || null; // Store roleId as a string (e.g. 'Admin', 'Doctor')
  });

  useEffect(() => {
    // Update role in localStorage when it changes
    if (role !== null) {
      localStorage.setItem('roleId', role);
    } else {
      localStorage.removeItem('roleId');
    }
  }, [role]);

  // Redirects unauthorized users based on their role
  const ProtectedRoute = ({ children, requiredRole }) => {
    if (role === null || role !== requiredRole) {
      return <Navigate to="/" replace />; // Redirect to Home if unauthorized
    }
    return children; // Otherwise, render the child components (protected routes)
  };

  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <AppHeader role={role} setRole={setRole} />
        <Content style={{ padding: '20px', background: '#fff' }}>
          <Routes>
            {/* Common Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/detail-doctor/:id" element={<DetailDoctor />} />
            <Route path="/detail-clinic/:id" element={<DetailClinic />} />
            <Route path="/detail-specialty/:id" element={<DetailSpecialty />} />

            {/* Admin Routes */}
            <Route
              path="/admin-dashboard"
              element={
                <ProtectedRoute requiredRole="Admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/allcodes"
              element={
                <ProtectedRoute requiredRole="Admin">
                  <AllCodes />
                </ProtectedRoute>
              }
            />
            <Route
              path="/clinics"
              element={
                <ProtectedRoute requiredRole="Admin">
                  <Clinics />
                </ProtectedRoute>
              }
            />
            <Route
              path="/doctor-clinic-specialty"
              element={
                <ProtectedRoute requiredRole="Admin">
                  <DoctorClinicSpecialty />
                </ProtectedRoute>
              }
            />
            <Route
              path="/doctor-info"
              element={
                <ProtectedRoute requiredRole="Admin">
                  <DoctorInfo />
                </ProtectedRoute>
              }
            />
            <Route
              path="/histories"
              element={
                <ProtectedRoute requiredRole="Admin">
                  <Histories />
                </ProtectedRoute>
              }
            />
            <Route
              path="/invoices"
              element={
                <ProtectedRoute requiredRole="Admin">
                  <Invoices />
                </ProtectedRoute>
              }
            />
            <Route
              path="/markdowns"
              element={
                <ProtectedRoute requiredRole="Admin">
                  <Markdowns />
                </ProtectedRoute>
              }
            />
            <Route
              path="/users"
              element={
                <ProtectedRoute requiredRole="Admin">
                  <Users />
                </ProtectedRoute>
              }
            />
            <Route
              path="/specialties"
              element={
                <ProtectedRoute requiredRole="Admin">
                  <Specialties />
                </ProtectedRoute>
              }
            />
            <Route
              path="/schedules"
              element={
                <ProtectedRoute requiredRole="Admin">
                  <Schedules />
                </ProtectedRoute>
              }
            />

            {/* Doctor Routes */}
            <Route
              path="/doctor-dashboard"
              element={
                <ProtectedRoute requiredRole="Doctor">
                  <DoctorDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/doctor-dashboard/schedule"
              element={
                <ProtectedRoute requiredRole="Doctor">
                  <ManageDoctorSchedule />
                </ProtectedRoute>
              }
            />
            <Route
              path="/doctor-dashboard/patients"
              element={
                <ProtectedRoute requiredRole="Doctor">
                  <ManageDoctorPatients />
                </ProtectedRoute>
              }
            />

            {/* Fallback Route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Appointment Booking System ©2024 Created with Ant Design
        </Footer>
      </Layout>
    </Router>
  );
};

export default App;
