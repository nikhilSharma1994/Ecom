import express from 'express'
import cors from 'cors'
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import multer from 'multer';





// App config

const app = express();
const port = process.env.PORT ||  4000;  
connectDB();
connectCloudinary();


// MIDDLWARES
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }));



// api end-points

app.use('/api/user',userRouter)
app.use('/api/product',productRouter)






app.listen(port,() => console.log('server started on PORT: '+ port));
