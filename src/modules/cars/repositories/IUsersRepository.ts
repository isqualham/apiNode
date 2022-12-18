import { User } from "../model/User";

interface IcreateUserData{
    name: string;
    password: string;
    email: string;
    driver_license: string;
}

interface IUsersRepository{
    store({name, password,email,driver_license}:IcreateUserData): Promise<void>;
    findByEmail(email: string): Promise<User>;
    findById(id: string): Promise<User>;
}

export {IUsersRepository}