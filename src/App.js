import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/authContext.jsx";
import Login from "./features/auth/Login";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import EditProductPage from "./pages/EditProductPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";

const RedirectToDashboardOrLogin = () => {
  const { user } = useAuth();
  return user.user_login ? (
    <Navigate to="/home/dashboard" />
  ) : (
    <Navigate to="/login" />
  );
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<RedirectToDashboardOrLogin />} />

          <Route
            path="/home/*"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="home" element={<Dashboard />} />
            <Route path="user" element={<div>USER</div>} />
            <Route path="products" element={<ProductPage />} />
            <Route path="products/edit/:id" element={<EditProductPage />} />
          </Route>

          <Route path="*" element={<div>404</div>} />

          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
