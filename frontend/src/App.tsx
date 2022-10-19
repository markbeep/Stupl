import TestHome from "./pages/test-home";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Konsti } from "./pages/konsti";
import { Yanick } from "./pages/Yanick";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import StatisticsPage from "./pages/StatisticsPage";
import LoginPage from "./pages/LoginPage";
import CreateAccount from "./pages/CreateAccount";
import { AuthProvider, useAuth } from "./authHanlder";
import React from "react";
import DataProtectionPolicy from "./pages/DataProtectionPolicy";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home"></Navigate>}></Route>

          <Route path="/createAccount" element={<CreateAccount />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          ></Route>

          <Route path="/about" element={<AboutPage />}></Route>
          <Route
            path="/dataProtectionPolicy"
            element={<DataProtectionPolicy />}
          ></Route>
          <Route path="/statistics" element={<StatisticsPage />}></Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default App;
