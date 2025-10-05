import { useNavigate } from "react-router-dom";
import { logout } from "@/services/authService";

export default function Navbar({ user, visible }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-2 bg-[#393E46] text-[#EEEEEE] shadow-md transition-opacity duration-500 mb-8 h-12 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <h1 className="text-xl text-white font-bold">Task Manager</h1>
      {user && (
        <div className="flex items-center gap-4">
          <span className="text-gray-700 dark:text-gray-300">{user.email}</span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-[#00ADB5] text-[#EEEEEE] hover:opacity-80 cursor-pointer"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
