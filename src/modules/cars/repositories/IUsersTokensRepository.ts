import { UserToken } from "../model/UserToken";

interface IUsersTokensData{
    user_id: string;
    expires_date: Date;
    refresh_token: string;
}

interface IUsersTokensRepository{
    store({user_id, expires_date, refresh_token}:IUsersTokensData): Promise<UserToken>;
}

export {IUsersTokensRepository}