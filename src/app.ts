import cors from "cors";
import express, { NextFunction, Request, Response } from 'express';
import "express-async-errors";
import 'reflect-metadata';
import swaggerUi from 'swagger-ui-express';

import swaggerFile from './swagger.json';

import createConnection from './dataBase/index';

import './dataBase';

import './shared/container';

import { router } from './routes';
import { Errors } from './errors/Errors';

createConnection();

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(cors());
app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Errors) {
        return response.status(err.statusCode).json({
            message: err.message
        });
    }
    return response.status(500).json({
        status: "error",
        message: `Internal server error - ${err.message}`
    });
});

export { app };