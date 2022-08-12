import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import UserTokesRepository from "../typeorm/repositories/UserTokesRepository";
import EtherealMail from '@config/mail/EtherealMail'

interface IRequest {
    email: string
}

class SendForgotPasswordEmailService {
    public async execute({ email }: IRequest): Promise<void> {
        const usersRepository = getCustomRepository(UsersRepository)
        const userTokensRepository = getCustomRepository(UserTokesRepository)

        const user = await usersRepository.findByEmail(email)

        if(!user) {
            throw new AppError('User does not exists')
        }

        const token = await userTokensRepository.generate(user.id)

        //console.log(token);        

        await EtherealMail.sendMail({
            to: email,
            body: `Solicitação de redefinição de senha receida: ${token?.token}`
        })
    }
}

export default SendForgotPasswordEmailService