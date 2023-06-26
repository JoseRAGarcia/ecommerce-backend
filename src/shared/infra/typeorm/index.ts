import { DataSource } from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import Order from '@modules/orders/infra/typeorm/entities/Order';
import OrdersProducts from '@modules/orders/infra/typeorm/entities/OrdersProducts';
import Product from '@modules/products/infra/typeorm/entities/Product';

import { CreateProducts1657755158691 } from './migrations/1657755158691-CreateProducts';
import { CreateUsers1658576508712 } from './migrations/1658576508712-CreateUsers';
import { CreateUserTokens1660326935522 } from './migrations/1660326935522-CreateUserTokens';
import { CreateCustomers1666048286491 } from './migrations/1666048286491-CreateCustomers';
import { CreateOrders1674743217019 } from './migrations/1674743217019-CreateOrders';
import { AddCustomerIdToOrders1674743802434 } from './migrations/1674743802434-AddCustomerIdToOrders';
import { CreateOrdersProducts1674747984950 } from './migrations/1674747984950-CreateOrdersProducts';
import { AddOrderIdToOrdersProducts1674748227304 } from './migrations/1674748227304-AddOrderIdToOrdersProducts';
import { AddProductIdToOrdersProducts1674748721297 } from './migrations/1674748721297-AddProductIdToOrdersProducts';

export const dataSource = new DataSource({
    type: 'postgres',
    host: 'db',
    port: 5432,
    username: 'postgres',
    password: 'docker',
    database: 'apivendas',
    entities: [User, UserToken, Customer, Order, OrdersProducts, Product],
    migrations: [
        CreateProducts1657755158691,
        CreateUsers1658576508712,
        CreateUserTokens1660326935522,
        CreateCustomers1666048286491,
        CreateOrders1674743217019,
        AddCustomerIdToOrders1674743802434,
        CreateOrdersProducts1674747984950,
        AddOrderIdToOrdersProducts1674748227304,
        AddProductIdToOrdersProducts1674748721297,
    ],
});