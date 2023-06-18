import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "../config/db.js";
const port = process.env.PORT;
import cookieParser from "cookie-parser";
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';

await connectDB(); //Want to connect first

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ maxAge: 84600 }));

app.use(cookieParser());

app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Hello from server')
});

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})