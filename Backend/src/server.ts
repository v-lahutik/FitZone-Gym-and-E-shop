import express, { Request, Response, NextFunction, Application } from 'express';
import cors from 'cors';
import { createError } from './utils/helper';
import { connectToDB } from './utils/db';
import dotenv from 'dotenv';
import morgan from 'morgan'
import userRouter from './routers/user.router';
import courseRouter from './routers/course.router';
import productRouter from './routers/product.router';


dotenv.config();
const app: Application = express();

// database connection
connectToDB();

// middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// routers
app.use('/users', userRouter)
app.use('/courses', courseRouter)
app.use('/products', productRouter)

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
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`server is up on port: ${port} 🚀`));