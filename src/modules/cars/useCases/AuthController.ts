import { AuthUseCase } from "./AuthUseCase";
import {Request, Response} from "express";
import { container } from "tsyringe";


class AuthController {

    async handle(request: Request, response:Response): Promise<Response>{

        try {
            const {password, email} = request.body;

            const authUseCase = container.resolve(AuthUseCase)
    
            const authInf = await authUseCase.execute({password, email});
    
            return response.status(200).json(authInf);
            
        } catch (error) {
            return response.status(400).json(error.message);                
        }
    }

}

export{AuthController}