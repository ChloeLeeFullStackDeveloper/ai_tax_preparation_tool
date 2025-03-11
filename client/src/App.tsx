import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Dashboard from "./pages/Dashboard";
import TaxInput from "./pages/TaxInput";
import TaxReport from "./pages/TaxReport";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./components/auth/PrivateRoute";
import Navbar from "./components/layout/Navbar";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route 
              path="/" 
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/tax-input" 
              element={
                <PrivateRoute>
                  <TaxInput />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/tax-report" 
              element={
                <PrivateRoute>
                  <TaxReport />
                </PrivateRoute>
              } 
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;