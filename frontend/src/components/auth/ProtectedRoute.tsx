import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

type Props = {
  children: React.ReactNode;
  roles?: string[];
};

function ProtectedRoute({ children, roles }: Props) {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) return null;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

<<<<<<< HEAD
  //  validación por roles (futuro admin, etc.)
  if (roles && roles.length > 0) {
    const hasRole = roles.includes(user?.role || "");

    if (!hasRole) {
=======
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (roles && roles.length > 0) {
    const hasRole = roles.includes(user.role);

    if (!hasRole) {
      if (user.role === "admin") {
        return <Navigate to="/admin" replace />;
      }

>>>>>>> qa
      return <Navigate to="/" replace />;
    }
  }

  return children;
}

export default ProtectedRoute;