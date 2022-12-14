import {Request, Response} from "express";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";


class ImportCategoryController{
    constructor(private importCategoryUseCase: ImportCategoryUseCase) {}

    handle(request: Request, response:Response): Response{

        try {
            const {file} = request;

            this.importCategoryUseCase.execute(file);
            
        } catch (error) {
            return response.status(400).json(error);                
        }
    }

}export {ImportCategoryController};