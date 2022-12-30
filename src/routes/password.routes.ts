import {Router} from 'express';

import { SendForgotPasswordMailController } from '../modules/cars/useCases/SendForgotPasswordMailController';

const passwordRoutes = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController

passwordRoutes.post("/forgot", sendForgotPasswordMailController.handle);    


export {passwordRoutes};