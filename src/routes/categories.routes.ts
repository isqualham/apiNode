import {Router} from 'express';
import multer from 'multer';
import { importCategoryController } from '../modules/cars/useCases/importCategory';
import { CreateCategoryController } from '../modules/cars/useCases/createCategory/CreateCategoryController';
import { AuthMiddleware } from '../middlewares/AuthMiddleware';


const categoriesRoutes = Router();

const upload = multer({
    dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();



categoriesRoutes.post("/", createCategoryController.handle);    


categoriesRoutes.get("/",AuthMiddleware, createCategoryController.handle);

categoriesRoutes.post("/import", upload.single("file"), (request, response) =>{
   return response.json(importCategoryController.handle(request, response));
});

export {categoriesRoutes};