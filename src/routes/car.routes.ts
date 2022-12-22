import {Router} from 'express';
import { AdminMiddleware } from '../middlewares/adminMiddleware';
import { AuthMiddleware } from '../middlewares/AuthMiddleware';
import { CarController } from '../modules/cars/useCases/createCategory/CarController';

const carRoutes = Router();

const carController = new CarController();

carRoutes.use(AuthMiddleware);
carRoutes.post("/" , AdminMiddleware,carController.handle);    

export {carRoutes};