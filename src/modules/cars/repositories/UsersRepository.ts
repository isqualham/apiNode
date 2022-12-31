import { IUsersRepository } from "./IUsersRepository";
import { getRepository, Repository } from "typeorm";
import { User } from "../model/User";

interface IcreateUserData{
    id: string;
    name: string;
    avatar: string;
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
        { id, name, avatar, password, email, driver_license 
        }: IcreateUserData): Promise<void> {

        const user = this.repository.create({
            id,
            name,
            avatar,
            password,
            email,
            driver_license 
        });

        await this.repository.save(user);
    };

    async findByEmail(email: string): Promise<User>{   
        return await this.repository.findOne({email});   
    };

    async findById(id: string): Promise<User>{            
        return await this.repository.findOne({id});  
    };
}

export{UsersRepository}