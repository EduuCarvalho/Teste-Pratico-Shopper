import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import priceRouter from './routers/price-router.js';
import { connectToDatabase } from './config/database.js';

const app = express();
connectToDatabase();
dotenv.config();
app.use(cors())
    .use(express.json())
    .use(priceRouter);

 
const port= process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));