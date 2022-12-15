import {Router} from 'express';
import multer from 'multer';
import { CategoriesRepository } from '../modules/cars/repositories/CategoriesRepository';
import { createCategoryController } from '../modules/cars/useCases/createCategory';
import { importCategoryController } from '../modules/cars/useCases/importCategory';



const categoriesRoutes = Router();
const categoriesRepository = CategoriesRepository.getInstance();

const upload = multer({
    dest: "./tmp",
});

categoriesRoutes.post("/", (request, response) =>{
    
    return createCategoryController.handle(request, response);
   
});

categoriesRoutes.get("/", (resquest, response) =>{
    const listAll = categoriesRepository.index();

    return response.status(200).json(listAll);
});

categoriesRoutes.post("/import", upload.single("file"), (request, response) =>{
   return response.json(importCategoryController.handle(request, response));
});

export {categoriesRoutes};