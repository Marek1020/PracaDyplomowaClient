import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './features/auth/Login';

const App = () => {

  return (
    
    <Router>

        <Routes>
          {/* Homepage redirect "/" /}
            {/ Dashboard subpages */}
            <Route path="/" element={<>HomePage</>} />
            <Route path="/ep1" element={<>ep1</>} />
            <Route path="*" element={<>404</>} />
            
            <Route path="/login" element={<Login/>} />
        </Routes>

    </Router>
  )
}

export default App