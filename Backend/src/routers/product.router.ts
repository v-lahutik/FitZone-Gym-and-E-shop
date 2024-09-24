import {Router} from 'express'
import { getAllProducts } from '../controllers/product.controller'


const productRouter = Router()



productRouter.get("/",getAllProducts)

export default productRouter