import express from "express";
import { login, logout, purchases, signup } from "../controllers/user.controller.js";
import userMiddeleware from "/Users/harshmishra/Desktop/Course-selling-website/backend/middleware/user.mid.js";

const router=express.Router()

router.post("/signup",signup)
router.post("/login",login)
router.get("/logout",logout)
router.get("/purchases",userMiddeleware,purchases)


export default router;