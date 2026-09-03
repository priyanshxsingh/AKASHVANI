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
  UserButton,
} from "@clerk/clerk-react";

import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
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
      <SignedIn>{children}</SignedIn>

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}


// ===============================
// DASHBOARD
// ===============================

function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <nav className="border-b border-slate-800 px-6 py-4 flex items-center justify-between">

        <h1 className="text-xl font-bold">
          AKASHVANI
        </h1>

        <UserButton afterSignOutUrl="/login" />

      </nav>

      <main className="flex items-center justify-center min-h-[calc(100vh-73px)]">

        <div className="text-center">

          <h2 className="text-4xl font-bold">
            Welcome to AKASHVANI
          </h2>

          <p className="text-slate-400 mt-3">
            Intelligent Weather Intelligence & Early Warning System
          </p>

        </div>

      </main>

    </div>
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

        {/* DASHBOARD */}
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