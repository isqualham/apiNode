import {container} from 'tsyringe';

import { InterfaceCategoriesRepository } from '../../modules/cars/repositories/InterfaceCategoriesRepository';
import { CategoriesRepository } from '../../modules/cars/repositories/CategoriesRepository';

container.registerSingleton<InterfaceCategoriesRepository>(
    "CategoriesRepository",
    CategoriesRepository
);