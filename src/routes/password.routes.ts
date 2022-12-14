import {Router} from 'express';
import { ResetPasswordController } from '../modules/cars/useCases/ResetPasswordController';

import { SendForgotPasswordMailController } from '../modules/cars/useCases/SendForgotPasswordMailController';

const passwordRoutes = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController;

const resetPasswordController  = new ResetPasswordController;

passwordRoutes.post("/forgot", sendForgotPasswordMailController.handle);

passwordRoutes.post("/reset",resetPasswordController.handle);  


export {passwordRoutes};