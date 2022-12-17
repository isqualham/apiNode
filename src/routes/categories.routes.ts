import {Router} from 'express';
import multer from 'multer';
import { CategoriesRepository } from '../modules/cars/repositories/CategoriesRepository';
import createCategoryController from '../modules/cars/useCases/createCategory';
import { importCategoryController } from '../modules/cars/useCases/importCategory';



const categoriesRoutes = Router();

const upload = multer({
    dest: "./tmp",
});

categoriesRoutes.post("/", (request, response) =>{console.log("sdsd");
    
    return createCategoryController().handle(request, response);
   
});

categoriesRoutes.get("/", (resquest, response) =>{
    const categoriesRepository = new CategoriesRepository();
    return categoriesRepository.index();
});

categoriesRoutes.post("/import", upload.single("file"), (request, response) =>{
   return response.json(importCategoryController.handle(request, response));
});

export {categoriesRoutes};