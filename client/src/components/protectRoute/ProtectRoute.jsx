import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import LayoutLoader from '../Layout/Loader';

const ProtectRoute = ({ children }) => {
    const { authUser, loader } = useSelector((state) => state.user);

    if (loader) return <LayoutLoader />;

    return authUser ? children ? children : <Outlet/> : <Navigate to="/login" />;
};

export default ProtectRoute;