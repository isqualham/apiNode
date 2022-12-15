import fs from 'fs';
import {parse as csvParse} from 'csv-parse';
import { InterfaceCategoriesRepository } from "../../repositories/InterfaceCategoriesRepository";

interface InterfaceCategory {
    name: string;
    description: string;
}

class ImportCategoryUseCase{
    constructor(private categoriesRepository: InterfaceCategoriesRepository){}

    loadCategory(file: Express.Multer.File): Promise<InterfaceCategory[]>{
        return new Promise((resolve, reject) => {
            const stream = fs.createReadStream(file.path);
            const categories: InterfaceCategory[] = [];

            const parseFile = csvParse();

            stream.pipe(parseFile);

            parseFile.on("data", async (line) => {
                const [name, description] = line;
                categories.push({
                    name,
                    description
                });
            }).on("end", () =>{
                fs.promises.unlink(file.path);
                resolve(categories);
            }).on("error", (err) =>{
                reject(err);
            });       
        });        
    }
   
    async execute(file: Express.Multer.File): Promise<void>{
        const categories = await this.loadCategory(file);
        categories.map(async (category) =>{
            const {name, description} = category;
            const categoryAlreadExists = this.categoriesRepository.findByName(name);

            if(!categoryAlreadExists)
                this.categoriesRepository.create({
                    name, 
                    description
                });           
            
        });
    }
}

export {ImportCategoryUseCase}