import {Request, Response} from "express";
import { container } from "tsyringe";
import { Errors } from "../../../../errors/Errors";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

class UserController{

    async handle(request: Request, response:Response): Promise<Response>{

        try {
            const {name, description} = request.body;

            const createCategoryUseCase = container.resolve(CreateCategoryUseCase)
    
            createCategoryUseCase.execute({name, description});
    
            return response.status(201).json();
            
        } catch (error) {
            throw new Errors(error.message);                
        }
    }

}export {UserController};