import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv/config';
import cors from 'cors'
import driverRoutes from './routes/driverRoutes.js'
import rickshawRoutes from './routes/rickshawRoutes.js'

import authRouter from './routes/authRoutes.js'

const app = express();
app.use(express.json());
app.use(cors({origin:"http://localhost:5173", credentials:true}))

app.use('/api/auth',authRouter);
app.use('/api/driver',driverRoutes);
app.use('/api/rickshaw',rickshawRoutes);

const start = async ()=>{
    try {
        const connectDB = await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database connected");
        app.listen(3000, ()=>{
            console.log("server listening on port 3000");
        })
    } catch (error) {
        console.log("error message is : ",error);
    }
}

start();