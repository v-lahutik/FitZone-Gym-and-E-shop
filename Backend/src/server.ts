import express, { Request, Response, NextFunction, Application } from "express";
import cors from "cors";
import { createError } from "./utils/helper";
import { connectToDB } from "./utils/db";
import dotenv from "dotenv";
import morgan from "morgan";
import userRouter from "./routers/user.router";
import productRouter from "./routers/product.router";
import cookieParser from "cookie-parser";
import adminRouter from "./routers/admin.router";
import { authenticateAndCheckRoles } from "./middlewares/authAndRoles";
import { createWeeklyCourses } from "./utils/setWeeklyCourse";
import cron from "node-cron";
import { uploadImage, uploadMultipleImages } from "./utils/cloudinaryUploader";
import { UserRole } from "./models/user.model";
import publicRouter from "./routers/public.router";

dotenv.config();
const app: Application = express();

// database connection
connectToDB();

// set courses for week
// every sunday at 6 am, this func is going to run to set the courses
cron.schedule("0 6 * * 0", async () => {
  await createWeeklyCourses();
});

// middlewares
app.use(express.json());
app.use(cors({ origin: "https://fit-zone-tedp.onrender.com", credentials: true }));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// routers
app.use("/public", publicRouter);
app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/admin", authenticateAndCheckRoles([UserRole.admin]), adminRouter);

// error handlers
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError("Route not found!", 404));
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    res.status(err.status || 500).json({ msg: err.message });
  }
});

// server
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`server is up on port: ${port} 🚀`));
