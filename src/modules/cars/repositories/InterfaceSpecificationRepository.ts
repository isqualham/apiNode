import { Category } from "../model/Category";

interface SpecificationData {
    name: string;
    description: string;
}

interface InterfaceSpecificationRepository{
    create({name, description}: SpecificationData):void;
    index(): Category[];
    findByName(name: string): Category;
}

export {InterfaceSpecificationRepository}