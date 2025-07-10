import { NavLink } from "react-router-dom";
import { FiUser, FiBookOpen, FiEdit, FiLogOut } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

export default function Sidebar() {
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="w-64 min-h-screen bg-gray-900 text-white flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold p-6">Life Manager</h2>
        <nav className="flex flex-col gap-3 px-6">
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              isActive ? "text-blue-400" : "text-white"
            }
          >
            <FiUser className="inline mr-2" /> Home
          </NavLink>
          <NavLink to="/dashboard/profile" className={({ isActive }) => isActive ? "text-blue-400" : "text-white"}>
            <FiUser className="inline mr-2" /> Profile
          </NavLink>
          <NavLink to="/dashboard/exercise" className={({ isActive }) => isActive ? "text-blue-400" : "text-white"}>
            <FiBookOpen className="inline mr-2" /> Exercise Recs
          </NavLink>
          <NavLink to="/dashboard/notes" className={({ isActive }) => isActive ? "text-blue-400" : "text-white"}>
            <FiEdit className="inline mr-2" /> Notes
          </NavLink>
        </nav>
      </div>
      <div className="border-t border-gray-700 p-4">
        <button onClick={handleLogout} className="flex items-center text-red-400 hover:text-red-600">
          <FiLogOut className="mr-2" /> Logout
        </button>
      </div>
    </div>
  );
}
