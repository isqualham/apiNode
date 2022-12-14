import {Router} from 'express';
import multer from 'multer';
import { CategoriesRepository } from '../modules/cars/repositories/CategoriesRepository';
import { createCategoryController } from '../modules/cars/useCases/createCategory';


const categoriesRoutes = Router();
const categoriesRepository = CategoriesRepository.getInstance();

const upload = multer({
    dest: "./tmp",
});

categoriesRoutes.post("/", (resquest, response) =>{
    
    return createCategoryController.handle(resquest, response);
   
});

categoriesRoutes.get("/", (resquest, response) =>{
    const listAll = categoriesRepository.index();

    return response.status(200).json(listAll);
});

categoriesRoutes.post("/import", upload.single(""), (resquest, response) =>{

});

export {categoriesRoutes};