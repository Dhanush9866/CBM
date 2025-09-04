import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Careers from './pages/Careers';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
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
  );
}

