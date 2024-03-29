import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import path from 'path'
import UsersRepository from "../infra/typeorm/repositories/UsersRepository";
import UserTokesRepository from "../infra/typeorm/repositories/UserTokesRepository";
import EtherealMail from '@config/mail/EtherealMail'
import SESMail from '@config/mail/SESMail'
import mailConfig from '@config/mail/mail';

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

        if (mailConfig.driver === 'ses') {
            await SESMail.sendMail({
                to: {
                    name: user.name,
                    email: user.email,
                },
                subject: '[Dehdo Ecommerce] Recuperação de Senha',
                templateData: {
                    file: forgotPasswordTemplate,
                    variables: {
                        name: user.name,
                        link: `${process.env.APP_WEB_URL}/reset-password?token=${token}`,
                    }
                }
            })
            return
        }

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
                    link: `${process.env.APP_WEB_URL}/reset-password?token=${token}`,
                }
            }
        })
    }
}

export default SendForgotPasswordEmailService