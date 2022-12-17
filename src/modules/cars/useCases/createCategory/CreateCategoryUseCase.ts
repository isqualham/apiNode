import { InterfaceCategoriesRepository } from "../../repositories/InterfaceCategoriesRepository";

interface CreateCategoryUseCaseData {
    name: string;
    description: string;
}

class CreateCategoryUseCase{
    constructor(private categoriesRepository: InterfaceCategoriesRepository){}

    async execute({name, description}:CreateCategoryUseCaseData): Promise<void>{

        const CategoryAlreadExists = await this.categoriesRepository.findByName(name);

        if(CategoryAlreadExists) 
            throw new Error("Category already exists");

        this.categoriesRepository.create({name, description});
    }
}

export {CreateCategoryUseCase}