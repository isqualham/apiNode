import { NextFunction, Request, Response } from "express";
import { Errors } from "../errors/Errors";
import { UsersRepository } from "../modules/cars/repositories/UsersRepository";



export async function  AdminMiddleware
    (request: Request, response: Response, next: NextFunction)
{
    
    const {id} = request.user;

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(id);

    if(!user.isAdmin)
        throw new Errors("user isn't admin");

    return next();

}