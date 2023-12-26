import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

dotenv.config();

const app = express();
app.use(cors(
    {
        origin: '*',
    methods: '*',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
    }
));
app.use(express.json());

app.use('/api/v1/post', postRoutes);
app.use ('/api/v1/dalle', dalleRoutes);
app.post('/api/v1/dalle', (req, res) => {
    req.setTimeout(60000); // Set timeout to 60000 ms or 60 seconds

   
});

app.get('/', async (req, res) => {
    res.send('Hello from MALLE');
})

const startServer = async () => {

    try {
        connectDB(process.env.MONGODB_URL);
        app.listen(8080, () => console.log('Server has started on port http://localhost:8080'))

     } catch (error)
    {
        console.log(error);
    }
    }

startServer();
