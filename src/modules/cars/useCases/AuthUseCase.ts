import {inject, injectable} from "tsyringe";
import { IUsersRepository } from "../repositories/IUsersRepository";
import {sign} from "jsonwebtoken";

import {compare} from "bcryptjs";
import { Errors } from "../../../errors/Errors";




interface IRequestData{
    email:string;
    password:string;
}

interface IResponseData{
    user: {
        name: string,
        email:string
    },
    token: string;
}

@injectable()
class AuthUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository:IUsersRepository
    ){}

    async execute({email, password}:IRequestData): Promise<IResponseData>{
        const user = await this.usersRepository.findByEmail(email);

        if(!user){
            throw new Errors("Email not found");
        }

        const passwordMatch = await compare(password, user.password);

        if(!passwordMatch){
            throw new Errors("password not found");
        }

        const token = sign(
            {},
            "e9d068a0df68fdc66bce4cf86bd6aa4d",
            {subject: user.id, expiresIn: "1d"}
        );
        

        return {
            user:{
                name: user.name,
                email: user.email
            },
            token
        };      

    }
}

export{AuthUseCase}
