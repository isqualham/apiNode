import {sign, verify} from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import auth from "../../../config/auth";
import { Errors } from "../../../errors/Errors";
import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";
import { IUsersTokensRepository } from "../repositories/IUsersTokensRepository";

dayjs.extend(utc);

interface IPayload {
    sub: string;
    email: string;
}

@injectable()
class RefreshTokenUseCase {
    constructor(
        @inject("UsersTokensRepository")
        private usersTokensRepository:IUsersTokensRepository
    ){}

    async execute(token: string): Promise<string>{
       const {sub, email} = verify(token, auth.secret_token) as IPayload;
       const user_id = sub;
       const userToken = await this.usersTokensRepository.
       findByUserIdAndRefreshToken(user_id, token);

       if(!userToken) throw new Errors("Refresh Token does not exists!");

       await this.usersTokensRepository.deleteById(userToken.id);

       const refresh_token = sign({email}, auth.secret_token,{
            subject: sub, 
            expiresIn: auth.expires_in_refresh_token
        });

        await this.usersTokensRepository.store({
            user_id: user_id,
            expires_date: dayjs().add(auth.expires_refresh_token, "days").toDate(),
            refresh_token,
        });

        return refresh_token;
    }
}
export {RefreshTokenUseCase}