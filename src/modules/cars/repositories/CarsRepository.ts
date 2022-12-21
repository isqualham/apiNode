import { Category } from "../model/Category"

import { getRepository, Repository } from "typeorm";
import { ICarsRepository } from "./ICarsRepository";
import { Car } from "../model/Car";

interface ICarUSeCaseData {
    name: string;
    description: string;
    daily_rate: number;
    license_plate: string;
    fine_amount: number;
    brand: string;
    category_id: string;
}


class CarsRepository  implements ICarsRepository{
    private repository: Repository<Car>;

    constructor(){
        this.repository = getRepository(Car);
    }

    async store({ name, description, daily_rate, license_plate, fine_amount, brand, category_id }: ICarUSeCaseData): Promise<Car> {
        const car = this.repository.create({                
            name,
            description, 
            daily_rate, 
            license_plate, 
            fine_amount, 
            brand, 
            category_id
        });

        await this.repository.save(car);

        return car;
    }

    async index(): Promise<Category[]>{
        return await this.repository.find();
    }

    async findByLicensePlate(license_plate: string): Promise<Car>{
        const car = await this.repository.findOne({license_plate});    
        return car;    
    }
}

export {CarsRepository}