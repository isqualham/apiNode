import { IUsersRepository } from "../repositories/IUsersRepository";
import {inject, injectable} from "tsyringe";
import {hash} from "bcryptjs";
import { Errors } from "../../../errors/Errors";

import { deleteFile } from "../../../utils/file";

interface IcreateUserData{
    name: string;
    avatar: string;
    password: string;
    email: string;
    driver_license: string;    
}

interface IUpdateAvatar{
    userId: string;
    avatarFile: string;
}

@injectable()
class UserUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ){}

    async execute({name, avatar, password,email,driver_license}:IcreateUserData): Promise<void> {

        const userAlreadyExists = await this.usersRepository.findByEmail(email);

        if(userAlreadyExists){
            throw new Errors("User already exists");
        }
        
        const passwordHash = await hash(password, 8);

        await this.usersRepository.store({
            name,
            avatar,
            password: passwordHash,
            email,
            driver_license
            
        });
    }

    async updateAvatar({userId, avatarFile}:IUpdateAvatar): Promise<void> {   

        const user = await this.usersRepository.findById(userId);

        if(user.avatar)
            await deleteFile(`./tmp/avatar/${user.avatar}`);

        user.avatar = avatarFile;
        
        await this.usersRepository.store(user);        
    }

}

export {UserUseCase}