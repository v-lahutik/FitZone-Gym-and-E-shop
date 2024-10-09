import express from "express";
import {
  getAllPublicTemplates,
  getCourseTemplateById,
} from "../controllers/public.controller";

const publicRouter = express.Router();

publicRouter.get("/courseTemplates", getAllPublicTemplates);
publicRouter.get("/courseTemplates/:tid", getCourseTemplateById);

export default publicRouter;
