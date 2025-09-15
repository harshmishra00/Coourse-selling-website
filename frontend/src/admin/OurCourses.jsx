import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaTrash, FaEdit, FaSignOutAlt, FaTachometerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function OurCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("admin");

  if (!token) {
    toast.error("Please login as an admin to view this page");
    navigate("/admin/login");
  }

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/v1/course/courses",
          { withCredentials: true }
        );
        setCourses(response.data.courses || []);
      } catch (error) {
        console.log("Error in fetching courses", error);
        toast.error("Failed to load courses");
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleDeleteCourse = async (courseId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/api/v1/course/delete/${courseId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      toast.success(response.data.message || "Course deleted successfully");

      setCourses(courses.filter((course) => course._id !== courseId));
    } catch (error) {
      console.log("Error in deleting course", error);
      toast.error("Failed to delete course");
    }
  };

  const handleUpdateCourse = (courseId) => {
    toast("Redirecting to Update Page...");
    navigate(`/admin/update-course/${courseId}`);
  };

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:3001/api/v1/user/logout", {
        withCredentials: true,
      });
      localStorage.removeItem("admin");
      toast.success("Logged out successfully");
      navigate("/admin/login");
    } catch (error) {
      console.log("Error in logging out", error);
      toast.error("Logout failed");
    }
  };

  const goToDashboard = () => {
    navigate("/admin/dashboard");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-semibold text-gray-600">Loading courses...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800  pr-[1300px]">Courses List</h1>

        <div className="flex gap-4">

          <button
            onClick={goToDashboard}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition"
          >
            <FaTachometerAlt /> Dashboard
          </button>


          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </header>


      <main className="p-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">📚 Our Courses</h2>

        {courses.length === 0 ? (
          <p className="text-gray-600">No courses available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col"
              >

                <div className="h-40 w-full overflow-hidden">
                  <img
                    src={
                      course.image?.url ||
                      course.image ||
                      "https://via.placeholder.com/400x200"
                    }
                    alt={course.title}
                    className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>


                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    {course.title}
                  </h2>
                  <p className="text-sm text-gray-600 mb-4 flex-grow">
                    {course.description}...
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    Price:{" "}
                    <span className="font-semibold text-green-600">
                      ₹{course.price}
                    </span>
                  </p>


                  <div className="flex justify-between mt-auto">
                    <button
                      onClick={() => handleUpdateCourse(course._id)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      <FaEdit /> Update
                    </button>
                    <button
                      onClick={() => handleDeleteCourse(course._id)}
                      className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default OurCourses;
