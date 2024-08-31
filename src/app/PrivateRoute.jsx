import { Navigate, Outlet } from 'react-router-dom';
import { isLoggedIn } from 'src/utils/helpers';

const PrivateRoute = () => {
  if (!isLoggedIn()) return <Navigate to='/' />;
  return <Outlet />;
};

export default PrivateRoute;
