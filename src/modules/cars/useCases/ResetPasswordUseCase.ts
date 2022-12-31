import {inject, injectable} from "tsyringe";
import {hash} from "bcryptjs";
import { Errors } from "../../../errors/Errors";
import { IUsersRepository } from "../repositories/IUsersRepository";
import { IUsersTokensRepository } from "../repositories/IUsersTokensRepository";
import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";

dayjs.extend(utc);


@injectable()
class ResetPasswordUseCase{

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("UsersTokensRepository")
        private usersTokensRepository:IUsersTokensRepository,
    ){};

    async execute(token: string, passaword: string): Promise<void> {
        const userToken = await this.usersTokensRepository.findByRefreshToken(token);

        if(!userToken)
           throw new Errors("token invalid");

        if(dayjs(userToken.expires_date).isBefore(dayjs())){
            await this.usersTokensRepository.deleteById(userToken.id);
            throw new Errors("token expired");
        }

        const user = await this.usersRepository.findById(userToken.id);
        
        user.password = await hash(passaword, 8);

        await this.usersRepository.store(user);

        await this.usersTokensRepository.deleteById(userToken.id);
    };
}
export {ResetPasswordUseCase}