import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import User from "../typeorm/entities/User";

interface IRequest {
    id: string
    name: string
    email: string
    password: string
}

class UpdateUserService {
    public async execute({ id, name, email, password }: IRequest): Promise<User> {
        const usersRepository = getCustomRepository(UsersRepository)

        const user = await usersRepository.findOne(id)

        if (!user) {
            throw new AppError('User not found')
        }

        const userExists = await usersRepository.findByEmail(email)

        if (userExists && email !== user.email) {
            throw new AppError('There is already an user with this email')
        }

        user.name = name
        user.password = password

        await usersRepository.save(user)

        return user
    }
}

export default UpdateUserService