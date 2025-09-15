import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

function Buy() {
  const { courseId } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("user");

  const handlePurchase = async () => {
    if (!token) {
      toast.error("Please login to purchase a course");
      navigate("/login");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `http://localhost:3001/api/v1/course/buy/${courseId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      toast.success(response.data.message || "Course purchased successfully");
      navigate("/purchases");
      
    } catch (error) {
      const status = error?.response?.status;

      if (status === 401) {
        toast.error("Session expired. Please login again.");
        navigate("/login");
      } else if (status === 409) {
        toast.error("You have already purchased this course");
        navigate("/purchases");
      } else {
        toast.error(error?.response?.data?.errors || "Failed to purchase course");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <button
        className="btn2 hover:scale-105"
        onClick={handlePurchase}
        disabled={loading}
      >
        {loading ? "Processing..." : "Buy Now"}
      </button>
    </div>
  );
}

export default Buy;
