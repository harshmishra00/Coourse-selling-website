import express from 'express';
import dotenv from "dotenv";
import mongoose from "mongoose";
import { v2 as cloudinary } from 'cloudinary';
import cors from 'cors';
import courseRoute from "/Users/harshmishra/Desktop/Course-selling-website/backend/routes/course.routes.js"
import fileUpload from 'express-fileupload';
import userRoute from "/Users/harshmishra/Desktop/Course-selling-website/backend/routes/user.routes.js"
import adminRoute from "/Users/harshmishra/Desktop/Course-selling-website/backend/routes/admin.route.js"
import cookieParser from 'cookie-parser';


const app = express()
dotenv.config();

app.use(express.json());
app.use(cookieParser());

//file upload in express
app.use
(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE"]
}));




const port = process.env.PORT || 3000
const DB_URI=process.env.MONGO_URI

try {
    mongoose.connect(DB_URI)
    console.log("Connected to mongoDB")
} catch (error) {
    console.log(error)
    
}

app.use("/api/v1/course", courseRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/admin", adminRoute);


//cloudinary setup for imgae 
cloudinary.config({ 
        cloud_name: process.env.cloud_name,
        api_key: process.env.api_key,
        api_secret: process.env.api_secret
    });



app.listen(port, () => {
  console.log(`Servere is running on port ${port}`)
})