import {Request, Response} from "express";
import { container } from "tsyringe";
import { Errors } from "../../../../errors/Errors";
import { CarUseCase } from "./CarUseCase";

class CarController{

    async handle(request: Request, response:Response): Promise<Response>{

        try {
            const {name,description,daily_rate,license_plate,fine_amount,brand,category_id} = request.body;

            const carUseCase = container.resolve(CarUseCase)
    
            const car = await carUseCase.execute({name,description,daily_rate,license_plate,fine_amount,brand,category_id});
    
            return response.status(201).json(car);
            
        } catch (error) {
            throw new Errors(error.message);                
        }
    }

}export {CarController};