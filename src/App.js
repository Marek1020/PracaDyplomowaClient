import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/authContext.jsx';
import Login from './features/auth/Login';
import HomePage from './pages/HomePage';
import ProtectedRoute from './routes/ProtectedRoute.jsx';

const RedirectToDashboardOrLogin = () => {
  const { user } = useAuth();
  return (user.user_login) ? <Navigate to="/home" /> : <Navigate to="/login" />;
};

const App = () => {

  return (

    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<RedirectToDashboardOrLogin />} />

          <Route path="/home/*" element={<ProtectedRoute><HomePage /></ProtectedRoute>}>
            {/* Nested routes under /home */}
            <Route path="user" element={<div>USER</div>} />
          </Route>

          <Route path="*" element={<div>404</div>} />

          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App