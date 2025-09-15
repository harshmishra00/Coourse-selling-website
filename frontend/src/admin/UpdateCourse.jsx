import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

function UpdateCourse() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/v1/course/${id}`, {
          headers: { 
            'Authorization': `Bearer ${localStorage.getItem('admin')}` 
          },
          credentials: "include"
        });

        const data = await res.json();
        console.log("Fetched course:", data);

        if (res.ok) {
          setTitle(data.title || data.course?.title || "");
          setDescription(data.description || data.course?.description || "");
          setPrice(data.price || data.course?.price || "");
          setImagePreview(data.image?.url || "");
        } else {
          toast.error(data.message || "Failed to fetch course");
          navigate("/admin/ourcourses");
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch course data");
        navigate("/admin/ourcourses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [id, navigate]);

  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage(file);
        setImagePreview(reader.result);
      };
    }
  };

  const handleUpdateCourse = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    if (image) formData.append("image", image);

    const admin = localStorage.getItem("admin");
    if (!admin) {
      navigate("/admin/login");
      return;
    }

    try {
      const res = await axios.put(
        `http://localhost:3001/api/v1/course/update/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${admin}`,
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      toast.success(res.data.message || "Course updated successfully");
      navigate("/admin/ourcourses");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.errors || "Failed to update course");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading course data...</p>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Update Course</h2>
        <form onSubmit={handleUpdateCourse} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              rows="4"
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Image</label>
            <input
              type="file"
              onChange={changePhotoHandler}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          {imagePreview && (
            <div className="flex justify-center my-2">
              <img
                src={imagePreview}
                alt="Course Preview"
                className="w-40 h-40 object-cover rounded-lg shadow-md"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition duration-200"
          >
            Update Course
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateCourse;
