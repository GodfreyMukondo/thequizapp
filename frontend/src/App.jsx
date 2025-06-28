import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './pages/Dashboard';
import ExamDetail from './components/exam/ExamDetail';
import ResultView from './components/result/ResultView';
import QuestionView from './components/exam/QuestionView';
import Home from './pages/Home';
import Sidebar from './components/common/Sidebar';
import Navbar from './components/common/Navbar';
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import QuestionManager from './components/exam/QuestionManager';
import AdminDashboard from './pages/AdminDashboard';
import RoleBasedRoute from './components/common/RoleBasedRoute';
import Unauthorized from './pages/Unauthorized';
import AddExam from './components/exam/AddExam';
import ExamsPage from './components/exam/ExamsPage';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PrivateLayout({ children }) {
  const { auth } = useContext(AuthContext);

  if (!auth.user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ marginLeft: '200px', flex: 1 }}>
        <Navbar />
        <div style={{ padding: '20px' }}>{children}</div>
      </div>
    </div>
  );
}

function AppRoutes() {
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    console.log('Auth user:', auth.user);
  }, [auth.user]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          auth.user ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Navigate to="/register" replace />
          )
        }
      />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      <Route
        path="/home"
        element={
          <PrivateLayout>
            <Home />
          </PrivateLayout>
        }
      />
      <Route
        path="/dashboard"
        element={
          <PrivateLayout>
            <Dashboard />
          </PrivateLayout>
        }
      />
      <Route
        path="/exams"
        element={
          <PrivateLayout>
            <ExamsPage />
          </PrivateLayout>
        }
      />
      <Route
        path="/exam/:id"
        element={
          <PrivateLayout>
            <ExamDetail />
          </PrivateLayout>
        }
      />
      <Route
        path="/results"
        element={
          <PrivateLayout>
            <ResultView />
          </PrivateLayout>
        }
      />
      <Route
        path="/view-questions"
        element={
          <PrivateLayout>
            <QuestionView />
          </PrivateLayout>
        }
      />
      <Route
        path="/question-manager"
        element={
          <PrivateLayout>
            <QuestionManager />
          </PrivateLayout>
        }
      />
      <Route
        path="/admin-dashboard"
        element={
          <RoleBasedRoute allowedRoles={['admin']}>
            <PrivateLayout>
              <AdminDashboard />
            </PrivateLayout>
          </RoleBasedRoute>
        }
      />

      <Route
        path="/add-exam"
        element={
          <PrivateLayout>
            <AddExam />
          </PrivateLayout>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
        <ToastContainer position="top-right" autoClose={3000} />
      </Router>
    </AuthProvider>
  );
}

export default App;
