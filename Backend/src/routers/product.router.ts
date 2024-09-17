import {Router} from 'express'
import { addNewProduct, deleteProduct, editProduct, seeAllProducts } from '../controllers/product.controller'
import { addNewCategory, deleteCategory } from '../controllers/category.controller'

const productRouter = Router()

productRouter.post("/add",addNewProduct)
productRouter.patch("/edit/:pid",editProduct)
productRouter.delete("/delete/:pid",deleteProduct)
productRouter.get("/",seeAllProducts)
productRouter.post("/category/add",addNewCategory)
productRouter.delete("/category/delete/:cid",deleteCategory)


export default productRouter