import {Router} from 'express';
import { authRoutes } from './auth.routes';
import { carRoutes } from './car.routes';
import { categoriesRoutes } from './categories.routes';
import { passwordRoutes } from './password.routes';
import { specificationRoutes } from './specification.routes';
import { usersRoutes } from './users.routes';

const router = Router();

router.use("/categories",categoriesRoutes);
router.use("/specification",specificationRoutes);
router.use("/users",usersRoutes);
router.use("/auth",authRoutes);
router.use("/car",carRoutes);
router.use("/password",passwordRoutes);

export {router};