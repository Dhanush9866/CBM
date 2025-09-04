import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Careers from './pages/Careers';
import ProtectedRoute from './components/ProtectedRoute';
import RouteScrollTop from './route-scroll-top';

export default function App() {
  return (
    <>
      <RouteScrollTop />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/careers"
          element={
            <ProtectedRoute>
              <Careers />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/careers" replace />} />
        <Route path="*" element={<Navigate to="/careers" replace />} />
      </Routes>
    </>
  );
}

