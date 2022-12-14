import {Router} from 'express';
import { SpecificationRepository } from '../modules/cars/repositories/SpecificationRepository';
import { CreateSpecificationService } from '../modules/cars/services/CreateSpecificationService';

const specificationRoutes = Router();
const specificationRepository = new SpecificationRepository();

specificationRoutes.post("/", (resquest, response) =>{

    try {
        const {name, description} = resquest.body;

        const specificationService = new CreateSpecificationService(specificationRepository);

        specificationService.execute({name, description});

        return response.status(201).json();
        
    } catch (error) {
        return response.status(400).json(error);                
    }
    
});

specificationRoutes.get("/", (resquest, response) =>{
    const listAll = specificationRepository.index();

    return response.status(200).json(listAll);
});

export {specificationRoutes};