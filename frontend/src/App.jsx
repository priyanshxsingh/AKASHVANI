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
import Dashboard from "./pages/dashboard/Dashboard";
import LogoLoader from "./components/LogoLoader";

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
// APP
// ===============================
function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* FIRST PAGE */}
        <Route
          path="/"
          element={<LoaderPage />}
        />

        {/* LOGIN */}
        <Route
          path="/login/*"
          element={<Login />}
        />

        {/* SIGNUP */}
        <Route
          path="/signup/*"
          element={<Signup />}
        />

        {/* PROTECTED DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* FALLBACK */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;