import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext.jsx';

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();

    console.log('user_login', user.user_login)

    return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
