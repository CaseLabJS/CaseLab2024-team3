import { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const isAdmin = true;

  if (!isAdmin) {
    return <Navigate to='/app' />;
  }

  return children;
};

export default ProtectedRoute;
