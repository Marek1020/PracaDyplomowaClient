import React from 'react'
import { useAuth } from '../context/authContext';
import { Link, Outlet } from 'react-router-dom';

const HomePage = () => {
  const { user } = useAuth();

  return (
    <Outlet />
  )
}

export default HomePage