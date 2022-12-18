import {Router} from 'express';
import multer from 'multer';
import { UserController } from '../modules/cars/useCases/UserController';

import uploadConfig from '../config/upload';
import { AuthMiddleware } from '../middlewares/AuthMiddleware';

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

const userController = new UserController();

usersRoutes.post("/", userController.handle);    

usersRoutes.patch("/avatar", AuthMiddleware, 
    uploadAvatar.single("avatar"), userController.update);    

export {usersRoutes};