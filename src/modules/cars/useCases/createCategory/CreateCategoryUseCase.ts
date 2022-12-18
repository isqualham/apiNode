import { inject, injectable } from "tsyringe";
import { Errors } from "../../../../errors/Errors";
import { InterfaceCategoriesRepository } from "../../repositories/InterfaceCategoriesRepository";

interface CreateCategoryUseCaseData {
    name: string;
    description: string;
}

@injectable()
class CreateCategoryUseCase{
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: InterfaceCategoriesRepository
    ){}

    async execute({name, description}:CreateCategoryUseCaseData): Promise<void>{

        const CategoryAlreadExists = await this.categoriesRepository.findByName(name);

        if(CategoryAlreadExists) 
            throw new Errors("Category already exists");

        this.categoriesRepository.create({name, description});
    }
}

export {CreateCategoryUseCase}