import { Category } from "../model/Category"
import { InterfaceCategoriesRepository } from "./InterfaceCategoriesRepository";

import { getRepository, Repository } from "typeorm";

interface CategoryData {
    name: string;
    description: string;
}

class CategoriesRepository  implements InterfaceCategoriesRepository{
    private repository: Repository<Category>;

    constructor(){
        this.repository = getRepository(Category);
    }    

    async create({name, description}: CategoryData):Promise<void>{
        const category = this.repository.create({                
            name,
            description,
        });

        await this.repository.save(category);
    }

    async index(): Promise<Category[]>{
        return await this.repository.find();
    }

    async findByName(name: string): Promise<Category>{
        const category = await this.repository.findOne({name});    
        return category;    
    }
}

export {CategoriesRepository}