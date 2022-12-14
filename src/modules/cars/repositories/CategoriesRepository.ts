import { Category } from "../model/Category"
import { InterfaceCategoriesRepository } from "./InterfaceCategoriesRepository";

interface CategoryData {
    name: string;
    description: string;
}

class CategoriesRepository implements InterfaceCategoriesRepository{
    private categories: Category[];

    //padrão de projeto Singleton Instance e getInstance e construct private

    private static INSTANCE: CategoriesRepository;

    private constructor(){
        this.categories = [];
    }

    public static getInstance(): CategoriesRepository{
        if(!CategoriesRepository.INSTANCE)
            CategoriesRepository.INSTANCE = new CategoriesRepository();

        return CategoriesRepository.INSTANCE;
    }

    create({name, description}: CategoryData):void{
        const category = new Category();
    
        Object.assign(category, {
            name,
            description,
            created_at: new Date()
        });    

        this.categories.push(category);
    }

    index(): Category[]{
        return this.categories;
    }

    findByName(name: string): Category{
        const category = this.categories.find(category => category.name === name);    
        return category;    
    }
}

export {CategoriesRepository}