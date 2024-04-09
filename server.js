import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';
import roomRoutes from './routes/roomRoute.js'
import cors from "cors";

dotenv.config();

connectDB();
const app = express();

app.use(express.json())
app.use(morgan('dev'))
app.use(cors({
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
}));

app.use('/api/auth',authRoutes);
app.use('/api/rooms',roomRoutes);

app.get("/",(req,res)=>{
    res.send("<h1>UPLABDH</h1>");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`.bgCyan.white);
});