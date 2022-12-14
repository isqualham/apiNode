import {Request, Response} from "express";
import { container } from "tsyringe";
import { UserUseCase } from "./UserUseCase";

class UserController {

    async handle(request: Request, response:Response): Promise<Response>{

        try {
            const {name,avatar, password, email, driver_license} = request.body;

            const userUseCase = container.resolve(UserUseCase)
    
            userUseCase.execute({name, password, email, driver_license, avatar});
    
            return response.status(201).json();
            
        } catch (error) {
            return response.status(400).json(error);                
        }
    };

    async update(request: Request, response:Response): Promise<Response>{

        try {
            const {id} = request.user;

            const avatar = request.file.filename;

            const userUseCase = container.resolve(UserUseCase)

            userUseCase.updateAvatar({userId:id, avatarFile: avatar});

            return response.status(204).json();
            
        } catch (error) {
            return response.status(400).json(error);                
        }
    }

}

export {UserController}