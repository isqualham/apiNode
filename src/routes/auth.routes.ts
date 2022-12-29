import {Router} from 'express';
import { AuthController } from '../modules/cars/useCases/AuthController';
import { RefreshTokenController } from '../modules/cars/useCases/RefreshTokenController';

const authRoutes = Router();

const authController = new AuthController();
const refreshTokenController = new RefreshTokenController();

authRoutes.post("/", authController.handle);    

authRoutes.post("/refresh-token", refreshTokenController.handle);   

export {authRoutes};