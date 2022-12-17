import {Request, Response} from "express";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

class CreateCategoryController{

    constructor(private createCategoryUseCase :CreateCategoryUseCase){}

    async handle(request: Request, response:Response): Promise<Response>{

        try {
            const {name, description} = request.body;
    
            this.createCategoryUseCase.execute({name, description});
    
            return response.status(201).json();
            
        } catch (error) {
            return response.status(400).json(error);                
        }
    }

}export {CreateCategoryController};