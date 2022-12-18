import {Router} from 'express';
import { UserController } from '../modules/cars/useCases/UserController';

const usersRoutes = Router();

const userController = new UserController();

usersRoutes.post("/", userController.handle);    

export {usersRoutes};