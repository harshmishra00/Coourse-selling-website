import express from "express";
import { createCourse, updateCourse, deleteCourse, getCourses, courseDetails, buyCourses } from "/Users/harshmishra/Desktop/Course-selling-website/backend/controllers/course.controller.js";
import userMiddeleware from "/Users/harshmishra/Desktop/Course-selling-website/backend/middleware/user.mid.js";
import adminMiddleware from "../middleware/admin.mid.js";

const router=express.Router()

router.post("/create",adminMiddleware,createCourse)
router.put("/update/:courseId",adminMiddleware,updateCourse)
router.delete("/delete/:courseId",adminMiddleware,deleteCourse)
router.get("/courses",getCourses)
router.get("/:courseId",courseDetails)

router.post("/buy/:courseId",userMiddeleware,buyCourses)

export default router;