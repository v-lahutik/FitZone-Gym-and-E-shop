import {Router} from "express";
import { createNewCourseTemplate, deleteCourseTemplate, editCourseTemplate, seeAllCourseTemplate } from "../controllers/courseTemplate.controller";
import { authenticateAndCheckRoles } from "../middlewares/authAndRoles";

const courseTemplateRouter =Router();


courseTemplateRouter.get('/',authenticateAndCheckRoles('Admin'), seeAllCourseTemplate)
courseTemplateRouter.post('/create',authenticateAndCheckRoles('Admin'),createNewCourseTemplate)
courseTemplateRouter.delete('/delete/:tid',authenticateAndCheckRoles('Admin'),deleteCourseTemplate)
courseTemplateRouter.patch('/edit/:tid',authenticateAndCheckRoles('Admin'),editCourseTemplate)

export default courseTemplateRouter;