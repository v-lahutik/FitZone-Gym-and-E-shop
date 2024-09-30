import express from 'express'
import { registerValidation } from '../validators/user.validator'
import { deleteUser, register, updateUser, getAllUsers } from '../controllers/admin.controller'
import { authenticateAndCheckRoles } from '../middlewares/authAndRoles'
import {getAllCourseTemplates, createNewCourseTemplate, editCourseTemplate, deleteCourseTemplate} from '../controllers/courseTemplate.controller';
import { addNewCourse, deleteCourse, editCourse, getAllCourses } from '../controllers/course.controller';
import { addNewProduct, deleteProduct, editProduct} from '../controllers/product.controller'
import { addNewCategory, deleteCategory } from '../controllers/category.controller';
import { error } from 'console';
import { deleteOrder, getAllOrders, getOneOrder, updateOrderStatus } from '../controllers/order.controller';
import { UserRole } from '../models/user.model';

const adminRouter=express.Router()

//edit Users
adminRouter.get('/members', getAllUsers)
adminRouter.post('/members/register', registerValidation, register)
adminRouter.put('/members/update/:uid', updateUser)
adminRouter.delete('/members/delete/:uid', deleteUser)

//edit CourseTemplates
adminRouter.get('/courseTemplates', getAllCourseTemplates)
adminRouter.post('/courseTemplates/create', createNewCourseTemplate)
adminRouter.put('/courseTemplates/update/:tid', editCourseTemplate)
adminRouter.delete('/courseTemplates/delete/:tid', deleteCourseTemplate)

//edit Courses
adminRouter.get('/courses',getAllCourses)
adminRouter.post('/courses/add',addNewCourse)
adminRouter.delete('/courses/delete/:cid',deleteCourse)
adminRouter.patch('/courses/edit/:cid',editCourse)

//edit Products
adminRouter.post("/products/add", addNewProduct)
adminRouter.patch("/products/edit/:pid",editProduct)
adminRouter.delete("/products/delete/:pid",deleteProduct)

//edit Categories
adminRouter.post("/products/category/add",addNewCategory)
adminRouter.delete("/products/category/delete/:pid",deleteCategory)

//edit Orders
adminRouter.get('/orders',getAllOrders)
adminRouter.get('/orders/:oid',getOneOrder)
adminRouter.patch('/orders/:oid',updateOrderStatus)
adminRouter.delete('/orders/:oid',deleteOrder)


export default adminRouter