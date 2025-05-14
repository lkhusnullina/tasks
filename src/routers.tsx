
import { Routes, Route, HashRouter } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import TaskPage from "./pages/TaskPage/TaskPage";

export const AppRoutes = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/tasks/:id" element={<TaskPage/>} />
      </Routes>
    </HashRouter>
  );
};