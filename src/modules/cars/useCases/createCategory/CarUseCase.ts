import { inject, injectable } from "tsyringe";
import { Errors } from "../../../../errors/Errors";
import { Car } from "../../model/Car";
import { ICarsRepository } from "../../repositories/ICarsRepository";

interface ICarUSeCaseData {
    name: string;
    description: string;
    daily_rate: number;
    license_plate: string;
    fine_amount: number;
    brand: string;
    category_id: string;
}

@injectable()
class CarUseCase {

    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ){}

    async execute({name,description,daily_rate,license_plate,fine_amount,brand,category_id}:ICarUSeCaseData): Promise<Car>{

        const carAlreadyExists = await this.carsRepository.findByLicensePlate(license_plate);

        if(carAlreadyExists)
            throw new Errors("car already exists");

        const car = await this.carsRepository.store({
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id
        });

        return car;
        
    }
}

export {CarUseCase}

