import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import priceRouter from './routers/price-router.js';
import connectToDatabase from './config/database.js';

const app = express();
dotenv.config();
app.use(cors())
    .use(express.json())
    /* .use(priceRouter); */
    app.get('/test', async (req, res) => {
        try {
          const connection = await connectToDatabase();
          const [rows, fields] = await connection.execute('SELECT * FROM products');
          res.send(rows);
        } catch (error) {
          console.error(error);
          res.status(500).send('Error while fetching data from MySQL');
        }
      });

 
    
const port= process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));