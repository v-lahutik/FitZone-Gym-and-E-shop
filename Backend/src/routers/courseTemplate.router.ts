import {Router} from "express";
import { createNewCourseTemplate, deleteCourseTemplate, editCourseTemplate, seeAllCourseTemplate } from "../controllers/courseTemplate.controller";
import { authenticateAndCheckRoles } from "../middlewares/authAndRoles";

const courseTemplateRouter =Router();


courseTemplateRouter.get('/',authenticateAndCheckRoles('admin'), seeAllCourseTemplate)
courseTemplateRouter.post('/create',authenticateAndCheckRoles('admin'),createNewCourseTemplate)
courseTemplateRouter.delete('/delete/:tid',authenticateAndCheckRoles('admin'),deleteCourseTemplate)
courseTemplateRouter.patch('/edit/:tid',authenticateAndCheckRoles('admin'),editCourseTemplate)

export default courseTemplateRouter;