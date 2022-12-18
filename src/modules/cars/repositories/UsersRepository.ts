import { IUsersRepository } from "./IUsersRepository";
import { getRepository, Repository } from "typeorm";
import { User } from "../model/User";

interface IcreateUserData{
    name: string;
    password: string;
    email: string;
    driver_license: string;
}

class UsersRepository implements IUsersRepository {

    private repository: Repository<User>;

    constructor(){
        this.repository = getRepository(User);
    };

    async store(
        { name, password, email, driver_license 
        }: IcreateUserData): Promise<void> {

        const user = this.repository.create({
            name,
            password,
            email,
            driver_license 
        });

        await this.repository.save(user);
    };

    async findByEmail(email: string): Promise<User>{
        const user = await this.repository.findOne({email});    
        return user;    
    };

    async findById(id: string): Promise<User>{
        const user = await this.repository.findOne({id});    
        return user;    
    };
}

export{UsersRepository}