import { useContext, useEffect } from 'react';
import { useNavigate, Route,Navigate } from 'react-router-dom';
import { LoginContext } from '../Context/LoginContext';

const PrivateRoute = ({ component: Component, ...props }) => {
  const [state,dispatch] = useContext(LoginContext);
  console.log(...props);
  console.log(Component());
  const navigate = useNavigate();
  // Redirect to login page if user is not authenticated
  useEffect(() => {
    if (!state) {
      navigate('/login');
    }
  }, [state]);

  return  state ? <Route {...props} render={(routeProps) => <Component {...routeProps} />} /> : <Navigate to="/login" />;
};

export default PrivateRoute;
