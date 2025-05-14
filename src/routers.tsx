
import { Routes, Route, HashRouter } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";

export const AppRoutes = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </HashRouter>
  );
};