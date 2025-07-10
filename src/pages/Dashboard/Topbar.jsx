import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Topbar() {
  const { user } = useAuth();
  const location = useLocation();

  const isHome = location.pathname === "/dashboard";

  return (
    <div className="w-full h-16 flex items-center justify-between px-6 border-b">
      <div className="text-lg font-semibold flex items-center gap-2">
        <img src="/logo192.png" alt="Logo" className="w-8 h-8" />
        <span>Life Manager</span>
      </div>

      <div className="flex items-center gap-4">
        {isHome && (
          <div className="text-gray-600 font-medium">
            Welcome back, {user?.displayName || "User"} 👋
          </div>
        )}
        {/* Username, dropdown, etc. */}
      </div>
    </div>
  );
}
