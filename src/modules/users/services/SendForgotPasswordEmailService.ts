import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import path from 'path'
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

        if (!user) {
            throw new AppError('User does not exists')
        }

        const { token } = await userTokensRepository.generate(user.id)

        const forgotPasswordTemplate = path.resolve(__dirname, '..', 'views', 'forgot_password.hbs')

        await EtherealMail.sendMail({
            to: {
                name: user.name,
                email: user.email,
            },
            subject: '[Dehdo Ecommerce] Recuperação de Senha',
            templateData: {
                file: forgotPasswordTemplate,
                variables: {
                    name: user.name,
                    link: `http://localhost:3000/reset-password?token=${token}`,
                }
            }
        })
    }
}

export default SendForgotPasswordEmailService