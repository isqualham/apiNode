import {container} from 'tsyringe';

import { InterfaceCategoriesRepository } from '../../modules/cars/repositories/InterfaceCategoriesRepository';
import { CategoriesRepository } from '../../modules/cars/repositories/CategoriesRepository';
import { IUsersRepository } from '../../modules/cars/repositories/IUsersRepository';
import { UsersRepository } from '../../modules/cars/repositories/UsersRepository';
import { ICarsRepository } from '../../modules/cars/repositories/ICarsRepository';
import { CarsRepository } from '../../modules/cars/repositories/CarsRepository';
import { UsersTokensRepository } from '../../modules/cars/repositories/UsersTokensRepository';
import { IUsersTokensRepository } from '../../modules/cars/repositories/IUsersTokensRepository';
import { EtherealMail } from '../../utils/EtherealMail';
import { IMail } from '../../utils/IMail';

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
);

container.registerSingleton<IUsersTokensRepository>(
    "UsersTokensRepository",
    UsersTokensRepository
);

container.registerInstance<IMail>(
    "EtherealMail",
    new EtherealMail()
);