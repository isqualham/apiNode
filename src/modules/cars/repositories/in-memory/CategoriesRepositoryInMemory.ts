import { Category } from "../../model/Category";
import { InterfaceCategoriesRepository } from "../InterfaceCategoriesRepository";


interface CategoryData {
    name: string;
    description: string;
}

class CategoriesRepositoryInMemory implements InterfaceCategoriesRepository{

    categories: Category[] = [];

    async create({ name, description }: CategoryData): Promise<void> {
        const category = new Category();

        Object.assign(category, { name, description });

        this.categories.push(category);
    }

    async index(): Promise<Category[]> {
        const categories = this.categories;
        return categories;
    }

    async findByName(name: string): Promise<Category> {
        const category = this.categories.find(category => category.name === name);
        return category;
    }

}

export {CategoriesRepositoryInMemory}