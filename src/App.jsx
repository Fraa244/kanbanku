import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BoardPage from "./pages/BoardPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AppBackground from "./components/AppBackground";
import ToastContainer from "./components/ToastContainer";
import { BoardProvider } from "./context/BoardContext";

export default function App() {
  return (
    <>
      <AppBackground />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/board"
          element={
            <ProtectedRoute>
              <BoardProvider>
                <BoardPage />
              </BoardProvider>
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/board" replace />} />
        <Route path="*" element={<Navigate to="/board" replace />} />
      </Routes>
      <ToastContainer />
    </>
  );
}
