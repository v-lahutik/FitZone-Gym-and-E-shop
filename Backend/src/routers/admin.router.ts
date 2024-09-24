import express from 'express'
import { registerValidation } from '../validators/user.validator'
import { deleteUser, register, updateUser, getAllUsers } from '../controllers/admin.controller'
import { authenticateAndCheckRoles } from '../middlewares/authAndRoles'


const adminRouter=express.Router()

adminRouter.get('/members', getAllUsers)
adminRouter.post('/register', registerValidation, register)
adminRouter.put('/update/:uid', authenticateAndCheckRoles('admin'), updateUser)
adminRouter.delete('/delete/:uid', authenticateAndCheckRoles('admin'), deleteUser)


export default adminRouter