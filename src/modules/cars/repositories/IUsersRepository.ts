import { User } from "../model/User";

interface IcreateUserData{
    name: string;
    password: string;
    email: string;
    driver_license: string;
    avatar?: string;
    id?: string;
}

interface IUsersRepository{
    store({id, name, avatar, password,email,driver_license}:IcreateUserData): Promise<void>;
    findByEmail(email: string): Promise<User>;
    findById(id: string): Promise<User>;
}

export {IUsersRepository}