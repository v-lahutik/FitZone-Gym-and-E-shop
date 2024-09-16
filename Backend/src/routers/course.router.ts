import {Router} from "express";
import { addNewCourse, deleteCourse, editCourse, seeAllCourses } from "../controllers/course.controller";

const courseRouter =Router();


courseRouter.get('/',seeAllCourses)
courseRouter.post('/add',addNewCourse)
courseRouter.delete('/delete/:cid',deleteCourse)
courseRouter.patch('/edit/:cid',editCourse)

export default courseRouter;