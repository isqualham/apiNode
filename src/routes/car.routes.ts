import {Router} from 'express';
import { CarController } from '../modules/cars/useCases/createCategory/CarController';

const carRoutes = Router();

const carController = new CarController();

carRoutes.post("/", carController.handle);    

export {carRoutes};