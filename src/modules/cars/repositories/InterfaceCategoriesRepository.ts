import { Category } from "../model/Category";

interface CategoryData {
    name: string;
    description: string;
}

interface InterfaceCategoriesRepository{
    create({name, description}: CategoryData):void;
    index(): Category[];
    findByName(name: string): Category;
}

export {InterfaceCategoriesRepository}