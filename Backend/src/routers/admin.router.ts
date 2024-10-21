import express from 'express';
import { registerValidation } from '../validators/user.validator';
import {
  deleteUser,
  register,
  updateUser,
  getAllUsers,
  fetchAllDatabase
} from '../controllers/admin.controller';
import { authenticateAndCheckRoles } from '../middlewares/authAndRoles';
import {
  getAllCourseTemplates,
  createNewCourseTemplate,
  editCourseTemplate,
  deleteCourseTemplate
} from '../controllers/courseTemplate.controller';
import {
  addNewCourse,
  deleteCourse,
  editCourse,
  getAllCourses
} from '../controllers/course.controller';
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  getAllProducts
} from '../controllers/product.controller';
import {
  addNewCategory,
  deleteCategory
} from '../controllers/category.controller';
import { error } from 'console';
import {
  deleteOrder,
  getAllOrders,
  getOneOrder,
  updateOrderStatus
} from '../controllers/order.controller';
import { UserRole } from '../models/user.model';
import {
  getAllMessages,
  updateStarredImportant
} from '../controllers/contact.controller';

const adminRouter = express.Router();

//get all data from DB
adminRouter.get('/fetchAllDatabase', fetchAllDatabase);

//edit Users
adminRouter.get('/members', getAllUsers);
adminRouter.post('/members/register', registerValidation, register);
adminRouter.put('/members/update/:uid', updateUser);
adminRouter.delete('/members/delete/:uid', deleteUser);

//edit CourseTemplates
adminRouter.get('/courseTemplates', getAllCourseTemplates);
adminRouter.post('/courseTemplates/create', createNewCourseTemplate);
adminRouter.put('/courseTemplates/update/:tid', editCourseTemplate);
adminRouter.delete('/courseTemplates/delete/:tid', deleteCourseTemplate);

//edit Courses
adminRouter.get('/courses', getAllCourses);
adminRouter.post('/courses/add', addNewCourse);
adminRouter.delete('/courses/delete/:cid', deleteCourse);
adminRouter.patch('/courses/edit/:cid', editCourse);

//edit Products
adminRouter.get('/products', getAllProducts);
adminRouter.post('/products/add', addNewProduct);
adminRouter.patch('/products/edit/:pid', editProduct);
adminRouter.delete('/products/delete/:pid', deleteProduct);

//edit Categories
adminRouter.post('/products/category/add', addNewCategory);
adminRouter.delete('/products/category/delete/:pid', deleteCategory);

//edit Orders
adminRouter.get('/orders', getAllOrders);
adminRouter.get('/orders/:oid', getOneOrder);
adminRouter.patch('/orders/:oid', updateOrderStatus);
adminRouter.delete('/orders/:oid', deleteOrder);

// GET route to fetch all messages (admin route)
// emails from contact form
adminRouter.get('/messages', getAllMessages);
adminRouter.patch('/messages/:id', updateStarredImportant);

export default adminRouter;
