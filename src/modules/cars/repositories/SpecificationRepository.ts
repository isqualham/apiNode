import { Category } from "../model/Category"
import { Specification } from "../model/Specification";
import { InterfaceSpecificationRepository } from "./InterfaceSpecificationRepository";


interface SpecificationData {
    name: string;
    description: string;
}

class SpecificationRepository implements InterfaceSpecificationRepository{
    private specification: Specification[];

    constructor(){
        this.specification = [];
    }

    create({name, description}: SpecificationData):void{
        const specification = new Specification();
    
        Object.assign(specification, {
            name,
            description,
            created_at: new Date()
        });    

        this.specification.push(specification);
    }

    index(): Specification[]{
        return this.specification;
    }

    findByName(name: string): Specification{
        const specification = this.specification.find(specification => specification.name === name);    
        return specification;    
    }
}

export {SpecificationRepository}