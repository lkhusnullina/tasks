
import { Routes, Route, HashRouter } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import TaskPage from "./pages/TaskPage/TaskPage";
import AuthPage from "./pages/AuthPage/AuthPage";

export const AppRoutes = () => {
  
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/tasks/" element={<MainPage />} />
        <Route path="/tasks/:id" element={<TaskPage/>} />
      </Routes>
    </HashRouter>
  );
};