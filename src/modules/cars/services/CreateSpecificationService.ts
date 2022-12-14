import { InterfaceSpecificationRepository } from "../repositories/InterfaceSpecificationRepository";

interface CreateSpecificationServiceData {
    name: string;
    description: string;
}

class CreateSpecificationService{
    constructor(private specificationRepository: InterfaceSpecificationRepository){}

    execute({name, description}:CreateSpecificationServiceData): void{

        const SpecificationRepository = this.specificationRepository.findByName(name);

        if(SpecificationRepository) 
            throw new Error("Specification already exists");

        this.specificationRepository.create({name, description});
    }
}

export {CreateSpecificationService}