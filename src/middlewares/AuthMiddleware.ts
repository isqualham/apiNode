import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import auth from "../config/auth";
import { Errors } from "../errors/Errors";
import { UsersRepository } from "../modules/cars/repositories/UsersRepository";
import { UsersTokensRepository } from "../modules/cars/repositories/UsersTokensRepository";

interface IPayload{
    sub: string;
}

export async function AuthMiddleware
    (request: Request, response: Response, next: NextFunction)
{
    const authHeader = request.headers.authorization;

    if(!authHeader){
        throw new Errors("token missing", 401);        
    }

    const [, token] = authHeader.split(" ");

    try {
        const {sub: userId} = verify(token, auth.secret_token) as IPayload;

        const usersRepository = new UsersRepository();

        const user = usersRepository.findById(userId)

        if(!user){
            throw new Errors("user does not exist", 401);
        }

        request.user = {
            id: userId
        }
        
        next();
    } catch {
        throw new Errors("token invalid", 401);        
    }

}