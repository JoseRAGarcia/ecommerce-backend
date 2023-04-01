import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import CustomersRepository from "../infra/typeorm/repositories/CustomersRepository";
import Customer from "../infra/typeorm/entities/Customer";

interface IRequest {
    id: string
}

class ShowCustomerService {
    public async execute({ id }: IRequest): Promise<Customer> {
        const customersRepository = getCustomRepository(CustomersRepository)

        const customer = await customersRepository.findOne(id)

        if (!customer) {
            throw new AppError('Customer not found')
        }

        return customer
    }
}

export default ShowCustomerService