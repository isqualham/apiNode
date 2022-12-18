import { IUsersRepository } from "../repositories/IUsersRepository";
import {inject, injectable} from "tsyringe";

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

    async execute({name,password,email,driver_license}
        :IcreateUserData): Promise<void> {
        await this.usersRepository.store({
            name,
            password,
            email,
            driver_license
        });
    }

}

export {UserUseCase}