import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import UsersRepository from "../infra/typeorm/repositories/UsersRepository";

interface IRequest {
    id: string
}

class DeleteUserService {
    public async execute({ id }: IRequest): Promise<void> {
        const usersRepository = getCustomRepository(UsersRepository)

        const user = await usersRepository.findById(id)

        if (!user) {
            throw new AppError('User not found')
        }

        await usersRepository.remove(user)
    }
}

export default DeleteUserService