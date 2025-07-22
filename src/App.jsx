import { Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";
// import ProtectedRoute from "./components/ProtectedRoute";
// import DashboardLayout from "./pages/Dashboard/DashboardLayout";
// import Overview from "./pages/sections/Home";
// import Exercise from "./pages/sections/Exercise";
// import Notes from "./pages/sections/Notes";
// import Profile from "./pages/Profile";
// import Hero from "./pages/Hero";
import { lazy, Suspense } from "react";


export default function App() {
  const Hero = lazy(() => import("./pages/Hero"));
  const Login = lazy(() => import("./pages/Login"));
  const DashboardLayout = lazy(() => import("./pages/Dashboard/DashboardLayout"));
  const Overview = lazy(() => import("./pages/sections/Home"));
  const Exercise = lazy(() => import("./pages/sections/Exercise"));
  const Notes = lazy(() => import("./pages/sections/Notes"));
  const Profile = lazy(() => import("./pages/Profile"));
  const ProtectedRoute = lazy(() => import("./components/ProtectedRoute"));
  const NotFound = lazy(() => import("./pages/NotFound"));


  return (
    <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Overview />} />
          <Route path="overview" element={<Overview />} />
          <Route path="exercise" element={<Exercise />} />
          <Route path="notes" element={<Notes />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );

}
