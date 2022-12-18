import { IUsersRepository } from "../repositories/IUsersRepository";
import {inject, injectable} from "tsyringe";
import {hash} from "bcryptjs";
import { Errors } from "../../../errors/Errors";

interface IcreateUserData{
    name: string;
    password: string;
    email: string;
    driver_license: string;
}

@injectable()
class UserUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ){}

    async execute({name,password,email,driver_license}:IcreateUserData): Promise<void> {

        const userAlreadyExists = await this.usersRepository.findByEmail(email);

        if(userAlreadyExists){
            throw new Errors("User already exists");
        }
        
        const passwordHash = await hash(password, 8);

        await this.usersRepository.store({
            name,
            password: passwordHash,
            email,
            driver_license
        });
    }

}

export {UserUseCase}