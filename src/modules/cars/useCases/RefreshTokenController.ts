import {Request, Response} from "express";
import { container } from "tsyringe";
import { Errors } from "../../../errors/Errors";
import { RefreshTokenUseCase } from "./RefreshTokenUseCase";

class RefreshTokenController {

    async handle(request: Request, response:Response): Promise<Response>{
        try {
            const token = request.body.token || 
                      request.header["x-access-token"] ||
                      request.query.token;
                    
            const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);

            const refresh_token = await refreshTokenUseCase.execute(token);

            return response.json(refresh_token);
            
        } catch (Error){
            throw new Errors("error refresh token"+Error.message);                        
        }               
    };

    
}

export {RefreshTokenController}