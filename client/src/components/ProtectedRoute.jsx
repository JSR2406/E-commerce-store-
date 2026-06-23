import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ allowAdmin = false }) {
  const { user, token } = useSelector((state) => state.auth);

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (allowAdmin && user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

