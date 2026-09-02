import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  UserButton,
} from "@clerk/clerk-react";

import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

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

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        <Route
          path="/login/*"
          element={<Login />}
        />

        <Route
          path="/signup/*"
          element={<Signup />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;