import {Request, Response} from "express";
import { container } from "tsyringe";
import { ResetPasswordUseCase } from "./ResetPasswordUseCase";

class ResetPasswordController{

    async handle(request: Request, response: Response): Promise<Response>{
        const {token, password} = request.body;

        const resetPasswordUseCase = container.resolve(ResetPasswordUseCase);
 
        await resetPasswordUseCase.execute(token, password);

        return response.json("senha alterada com sucesso");

    };

}
export {ResetPasswordController}