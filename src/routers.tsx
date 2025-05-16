import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import TaskPage from './pages/TaskPage/TaskPage';
import AuthPage from './pages/AuthPage/AuthPage';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import LayoutPage from './pages/LayoutPage/LayoutPage';
import CreateTaskPage from './pages/CreateTaskPage/CreateTaskPage';
import EditTaskPage from './pages/EditTaskPage/EditTaskPage';

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<AuthPage />} />
          <Route path="/" element={<LayoutPage />}>
            <Route element={<ProtectedRoute />}>
              <Route index element={<MainPage />} />
              <Route path="/tasks/:id" element={<TaskPage />} />
              <Route path="/create" element={<CreateTaskPage/>} />
              <Route path="/tasks/:id/edit" element={<EditTaskPage/>} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};
