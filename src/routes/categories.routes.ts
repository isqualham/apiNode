import {Router} from 'express';
import multer from 'multer';
import { CategoriesRepository } from '../modules/cars/repositories/CategoriesRepository';
import { importCategoryController } from '../modules/cars/useCases/importCategory';
import { CreateCategoryController } from '../modules/cars/useCases/createCategory/CreateCategoryController';


const categoriesRoutes = Router();

const upload = multer({
    dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();

categoriesRoutes.post("/", createCategoryController.handle);    


categoriesRoutes.get("/", (resquest, response) =>{
    const categoriesRepository = new CategoriesRepository();
    return categoriesRepository.index();
});

categoriesRoutes.post("/import", upload.single("file"), (request, response) =>{
   return response.json(importCategoryController.handle(request, response));
});

export {categoriesRoutes};