import {container} from 'tsyringe';

import { InterfaceCategoriesRepository } from '../../modules/cars/repositories/InterfaceCategoriesRepository';
import { CategoriesRepository } from '../../modules/cars/repositories/CategoriesRepository';
import { IUsersRepository } from '../../modules/cars/repositories/IUsersRepository';
import { UsersRepository } from '../../modules/cars/repositories/UsersRepository';
import { ICarsRepository } from '../../modules/cars/repositories/ICarsRepository';
import { CarsRepository } from '../../modules/cars/repositories/CarsRepository';

container.registerSingleton<InterfaceCategoriesRepository>(
    "CategoriesRepository",
    CategoriesRepository
);

container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UsersRepository
);

container.registerSingleton<ICarsRepository>(
    "CarsRepository",
    CarsRepository
)