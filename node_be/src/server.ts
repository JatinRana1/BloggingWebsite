import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectServer } from './connection/connectdb';
import { userRouter } from './routes/userRouter';
import { authMiddleware } from './middleware/authMiddleware';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
// app.use((req,res,next)=> {
//     console.log(req.path);
//     console.log(req.method);
//     next();
// })

// Routes
app.use('/user', userRouter)
app.get('/', (req: Request, res: Response) => {
    res.send('hello world');
});

// Connect to database and start server
connectServer().then(() => {
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });
}).catch((error) => {
    console.error('Failed to connect to the database:', error);
});
