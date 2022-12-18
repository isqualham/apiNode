import {Router} from 'express';
import { AuthController } from '../modules/cars/useCases/AuthController';

const authRoutes = Router();

const authController = new AuthController();

authRoutes.post("/", authController.handle);    

export {authRoutes};