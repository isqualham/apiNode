import { UserToken } from "../model/UserToken";

interface IUsersTokensData{
    user_id: string;
    expires_date: Date;
    refresh_token: string;
}

interface IUsersTokensRepository{
    store({user_id, expires_date, refresh_token}:IUsersTokensData): Promise<UserToken>;
    findByUserIdAndRefreshToken(user_id: string, refresh_token:string): Promise<UserToken>;
    findByRefreshToken(token:string): Promise<UserToken>;
    deleteById(id:string): Promise<void>;
}

export {IUsersTokensRepository}