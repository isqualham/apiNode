import {inject, injectable} from "tsyringe";
import { v4 as uuidV4 } from "uuid";
import { Errors } from "../../../errors/Errors";
import { IUsersRepository } from "../repositories/IUsersRepository";
import { IUsersTokensRepository } from "../repositories/IUsersTokensRepository";
import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";
import { IMail } from "../../../utils/IMail";

dayjs.extend(utc);


@injectable()
class SendForgotPasswordMailUseCase{

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("UsersTokensRepository")
        private usersTokensRepository:IUsersTokensRepository,
        @inject("EtherealMail")
        private etherealMail:IMail
    ){};

    async execute(email : string): Promise<void> {
        const user = await this.usersRepository.findByEmail(email);

        if(!user)throw new Errors("email not found");

        const token = uuidV4();

        await this.usersTokensRepository.store({
            refresh_token: token,
            user_id: user.id,
            expires_date: dayjs().add(1, "hour").toDate()
        });

        await this.etherealMail.sendMail(
            email,
            "recuperação de senha",
            `O link para o reset é ${token}`
        );
    };
}
export {SendForgotPasswordMailUseCase}