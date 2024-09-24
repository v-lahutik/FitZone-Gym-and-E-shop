import express from 'express'
import { registerValidation } from '../validators/user.validator'
import { deleteUser, register, updateUser } from '../controllers/admin.controller'
import { authorizeRoles } from '../middlewares/authRoleAdmin'


const adminRouter=express.Router()

adminRouter.post('/register', registerValidation, register)
// adminRouter.post('/register', registerValidation, authorizeRoles("admin"), register)
adminRouter.put('/update/:uid', authorizeRoles("admin"), updateUser)
adminRouter.delete('/delete/:uid', authorizeRoles("admin"), deleteUser)


export default adminRouter