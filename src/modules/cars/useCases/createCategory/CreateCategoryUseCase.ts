import { InterfaceCategoriesRepository } from "../../repositories/InterfaceCategoriesRepository";

interface CreateCategoryUseCaseData {
    name: string;
    description: string;
}

class CreateCategoryUseCase{
    constructor(private categoriesRepository: InterfaceCategoriesRepository){}

    execute({name, description}:CreateCategoryUseCaseData): void{

        const CategoryAlreadExists = this.categoriesRepository.findByName(name);

        if(CategoryAlreadExists) 
            throw new Error("Category already exists");

        this.categoriesRepository.create({name, description});
    }
}

export {CreateCategoryUseCase}