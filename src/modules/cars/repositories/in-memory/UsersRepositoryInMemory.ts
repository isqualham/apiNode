import { User } from "../../model/User";
import { IUsersRepository } from "../IUsersRepository";


interface IcreateUserData{
    name: string;
    avatar?: string;
    password: string;
    email: string;
    driver_license: string;    
}

class UsersRepositoryInMemory implements IUsersRepository {
    users: User[] = [];

    async store({name, avatar, password, email, driver_license }: IcreateUserData): Promise<void> {
        const user = new User();

        Object.assign(user, {name, avatar, password, email, driver_license});

        this.users.push(user);
    };

    async findByEmail(email: string): Promise<User> {
        return this.users.find(user => user.email === email);
    };

    async findById(id: string): Promise<User> {
        return this.users.find(user => user.id === id);
    }

}

export {UsersRepositoryInMemory}