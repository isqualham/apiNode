import {inject, injectable} from "tsyringe";
import { IUsersRepository } from "../repositories/IUsersRepository";
import {sign} from "jsonwebtoken";

import {compare} from "bcryptjs";
import { Errors } from "../../../errors/Errors";
import { IUsersTokensRepository } from "../repositories/IUsersTokensRepository";
import auth from "../../../config/auth";
import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";

dayjs.extend(utc);


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
    refresh_token:string;
}

@injectable()
class AuthUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("UsersTokensRepository")
        private usersTokensRepository:IUsersTokensRepository
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

        const token = sign({}, auth.secret_token, {
            subject: user.id, 
            expiresIn: auth.expires_in_token
        });

        const refresh_token = sign({email}, auth.secret_refresh_token,{
            subject: user.id, 
            expiresIn: auth.expires_in_refresh_token
        });

        // await this.usersTokensRepository.store({
        //     user_id: user.id,
        //     expires_date: dayjs().add(auth.expires_refresh_token, "days").toDate(),
        //     refresh_token,
        // });

        return {
            user:{
                name: user.name,
                email: user.email
            },
            token,
            refresh_token
        };      

    }
}

export {AuthUseCase}



