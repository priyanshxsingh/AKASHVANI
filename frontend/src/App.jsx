import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/clerk-react";

import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

import Dashboard from "./pages/Dashboard";
import RiskAnalysis from "./pages/RiskAnalysis";
import WeatherIntelligence from "./pages/WeatherIntelligence";
import Alerts from "./pages/Alerts";
import NdrfResponse from "./pages/NdrfResponse";
import DataSources from "./pages/DataSources";
import SystemStatus from "./pages/SystemStatus";

import LogoLoader from "./pages/LogoLoader";

import DashboardLayout from "./components/dashboard/DashboardLayout";


// ===============================
// LOADER PAGE
// ===============================

function LoaderPage() {
  const navigate = useNavigate();

  return (
    <LogoLoader
      onComplete={() => {
        navigate("/login", { replace: true });
      }}
    />
  );
}


// ===============================
// PROTECTED ROUTE
// ===============================

function ProtectedRoute({ children }) {
  return (
    <>
      <SignedIn>
        {children}
      </SignedIn>

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}


// ===============================
// DASHBOARD WRAPPER
// ===============================

function ProtectedDashboard({ children }) {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        {children}
      </DashboardLayout>
    </ProtectedRoute>
  );
}


// ===============================
// APP
// ===============================

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =========================
            FIRST PAGE
        ========================= */}

        <Route
          path="/"
          element={<LoaderPage />}
        />


        {/* =========================
            LOGIN
        ========================= */}

        <Route
          path="/login/*"
          element={<Login />}
        />


        {/* =========================
            SIGNUP
        ========================= */}

        <Route
          path="/signup/*"
          element={<Signup />}
        />


        {/* =========================
            DASHBOARD
        ========================= */}

        <Route
          path="/dashboard"
          element={
            <ProtectedDashboard>
              <Dashboard />
            </ProtectedDashboard>
          }
        />


        {/* =========================
            RISK ANALYSIS
        ========================= */}

        <Route
          path="/dashboard/risk"
          element={
            <ProtectedDashboard>
              <RiskAnalysis />
            </ProtectedDashboard>
          }
        />


        {/* =========================
            WEATHER INTELLIGENCE
        ========================= */}

        <Route
          path="/dashboard/weather"
          element={
            <ProtectedDashboard>
              <WeatherIntelligence />
            </ProtectedDashboard>
          }
        />


        {/* =========================
            ALERTS
        ========================= */}

        <Route
          path="/dashboard/alerts"
          element={
            <ProtectedDashboard>
              <Alerts />
            </ProtectedDashboard>
          }
        />


        {/* =========================
            NDRF RESPONSE
        ========================= */}

        <Route
          path="/dashboard/ndrf"
          element={
            <ProtectedDashboard>
              <NdrfResponse />
            </ProtectedDashboard>
          }
        />


        {/* =========================
            DATA SOURCES
        ========================= */}

        <Route
          path="/dashboard/data-sources"
          element={
            <ProtectedDashboard>
              <DataSources />
            </ProtectedDashboard>
          }
        />


        {/* =========================
            SYSTEM STATUS
        ========================= */}

        <Route
          path="/dashboard/system"
          element={
            <ProtectedDashboard>
              <SystemStatus />
            </ProtectedDashboard>
          }
        />


        {/* =========================
            FALLBACK
        ========================= */}

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;