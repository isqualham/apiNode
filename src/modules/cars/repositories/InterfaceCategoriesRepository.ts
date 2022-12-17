import { Category } from "../model/Category";

interface CategoryData {
    name: string;
    description: string;
}

interface InterfaceCategoriesRepository{
    create({name, description}: CategoryData):Promise<void>;
    index(): Promise<Category[]>;
    findByName(name: string): Promise<Category>;
}

export {InterfaceCategoriesRepository}