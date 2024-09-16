import express, { Request, Response, NextFunction, Application } from 'express';
import cors from 'cors';
import { createError } from './utils/helper';
import { connectToDB } from './utils/db';
import dotenv from 'dotenv';
import userRouter from './routers/user.router';


dotenv.config();
const app: Application = express();

// database connection
connectToDB();

// middlewares
app.use(express.json());
app.use(cors());

// routers
app.use('/users', userRouter)

// error handlers
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError('Route not found!', 404));
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    res.status(err.status || 500).json({ msg: err.message });
  }
});

// server
const port = 6000;
app.listen(port, () => console.log(`server is up on port: ${port} 🚀`));