import express from "express";
import {
  getAllPublicTemplates,
  getCourseTemplateById,
  getProductById,
} from "../controllers/public.controller";

const publicRouter = express.Router();

publicRouter.get("/courseTemplates", getAllPublicTemplates);
publicRouter.get("/courseTemplates/:tid", getCourseTemplateById);

publicRouter.get("/products/:pid", getProductById);

export default publicRouter;
