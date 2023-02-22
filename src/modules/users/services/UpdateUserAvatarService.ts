import uploadConfig from '@config/upload';
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import User from "../typeorm/entities/User";
import DiskStorageProvider from '@shared/providers/StorageProvider/DiskStorageProvider'
import S3StorageProvider from '@shared/providers/StorageProvider/S3StorageProvider';

interface IRequest {
    user_id: string
    avatarFileName: string
}

class UpdateUserAvatarService {
    public async execute({ user_id, avatarFileName }: IRequest): Promise<User> {
        const usersRepository = getCustomRepository(UsersRepository)

        const user = await usersRepository.findById(user_id)

        if (!user) {
            throw new AppError('User not found')
        }

        const storageProvider = uploadConfig.driver === 's3' ? new S3StorageProvider() : new DiskStorageProvider()

        if (user.avatar) {
            await storageProvider.deleteFile(user.avatar)
        }

        const filename = await storageProvider.saveFile(avatarFileName)
        user.avatar = filename;   

        await usersRepository.save(user)

        return user
    }
}

export default UpdateUserAvatarService