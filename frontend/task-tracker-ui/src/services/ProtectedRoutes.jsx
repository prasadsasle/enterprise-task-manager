import { Navigate } from 'react-router-dom';
import auth from '../services/auth';

const ProtectedRoutes = ({ children }) => {
    const currentUser = auth.getCurrentUser();
    return currentUser ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;