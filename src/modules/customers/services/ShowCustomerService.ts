import AppError from "@shared/errors/AppError";
import Customer from "../infra/typeorm/entities/Customer";
import { inject, injectable } from 'tsyringe';
import { ICustomersRepository } from "../domain/repositories/ICustomersRepository";

interface IRequest {
    id: string
}

@injectable()
class ShowCustomerService {
    constructor(
        @inject('CustomersRepository')
        private customersRepository: ICustomersRepository
        ) {}

    public async execute({ id }: IRequest): Promise<Customer> {
        const customer = await this.customersRepository.findById(id)

        if (!customer) {
            throw new AppError('Customer not found')
        }

        return customer
    }
}

export default ShowCustomerService