import { container } from 'tsyringe'
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import CustomersRepository from '@modules/customers/infra/typeorm/repositories/CustomersRepository';

import '@modules/users/providers'

container.registerSingleton<ICustomersRepository>('CustomersRepository', CustomersRepository)
