
interface IcreateUserData{
    name: string;
    password: string;
    email: string;
    driver_license: string;
}

interface IUsersRepository{
    store({name, password,email,driver_license}:IcreateUserData): Promise<void>;
}

export {IUsersRepository}