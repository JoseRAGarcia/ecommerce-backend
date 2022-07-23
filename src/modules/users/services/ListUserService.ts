import { getCustomRepository } from "typeorm";
import UsersRepository from "../typeorm/entities/repositories/UsersRepository";
import User from "../typeorm/entities/User";

class ListUserService {
    public async execute(): Promise<User[]> {
        const usersRepository = getCustomRepository(UsersRepository)

        const users = usersRepository.find()

        return users
    }
}

export default ListUserService