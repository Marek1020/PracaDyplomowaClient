import React, { useState } from "react";
import { Navigate } from "react-router-dom";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  return <>{isLogin ? <Navigate to="/" /> : "false"}</>;
};

export default Login;
