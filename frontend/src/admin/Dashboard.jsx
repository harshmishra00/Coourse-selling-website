import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaBook, FaPlusCircle, FaHome, FaSignOutAlt } from "react-icons/fa";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/admin/login");
  };

  return (
    <div className="flex min-h-screen ">
      
      <aside className="w-64 bg-white shadow-lg flex flex-col items-center py-8">
        
        <div className="flex flex-col items-center mb-10 ">
          <FaUserCircle className="text-6xl text-gray-600 mb-3" />
          <h2 className="text-lg font-semibold">I’m Admin</h2>
        </div>


        <nav className="flex flex-col w-full px-6 space-y-4">
          <button
            onClick={() => navigate("/admin/Ourcourses")}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition"
          >
            <FaBook /> Our Courses
          </button>

          <button
            onClick={() => navigate("/admin/create-course")}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-orange-500 text-white font-semibold hover:bg-orange-600 transition"
          >
            <FaPlusCircle /> Create Course
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition"
          >
            <FaHome /> Home
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-yellow-500 text-white font-semibold hover:bg-yellow-600 transition"
          >
            <FaSignOutAlt /> Logout
          </button>
        </nav>
      </aside>
      <h1 className="admin flex items-center justify-center pl-[550px] ">Welcome Admin...</h1>

      
    </div>
  );
}

export default Dashboard;
