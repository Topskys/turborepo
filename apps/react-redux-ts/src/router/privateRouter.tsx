import { Navigate, Route, RouteProps } from "react-router-dom";

export const PrivateRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  let isAllowed = true;
  return (
    <Route
      {...rest}
      element={isAllowed ? children : <Navigate to="/login" replace />}
    />
  );
};
