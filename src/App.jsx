import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Layout/Navbar";
import Landing from "./pages/Landing";
import CreateRoadmap from "./pages/CreateRoadmap";
import GeneratedRoadmap from "./pages/GeneratedRoadmap";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import About from "./pages/About";
import Explore from "./pages/Explore";
import ViewRoadmap from "./components/ViewRoadmap";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/create" element={<CreateRoadmap />} />
        <Route path="/generated" element={<GeneratedRoadmap />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/roadmap/:id" element={<ViewRoadmap />} />
        <Route path="/not-found" element={<NotFound />} />


        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
