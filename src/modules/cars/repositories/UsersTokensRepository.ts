import { getRepository, Repository } from "typeorm";
import { UserToken } from "../model/UserToken";
import { IUsersTokensRepository } from "./IUsersTokensRepository";

interface UsersTokensData{
    user_id: string;
    expires_date: Date;
    refresh_token: string;
}

class UsersTokensRepository implements IUsersTokensRepository{

    private repository: Repository<UserToken>;

    constructor(){
        this.repository = getRepository(UserToken);
    };

    async store(
        { user_id, expires_date, refresh_token}: UsersTokensData): Promise<UserToken>{

        const userToken = this.repository.create({
            user_id, 
            expires_date, 
            refresh_token
        });

        await this.repository.save(userToken);

        return userToken;
    };
}

export{UsersTokensRepository}