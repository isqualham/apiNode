import { Car } from "../../model/Car";
import { ICarsRepository } from "../ICarsRepository";

interface ICarUSeCaseData {
    name: string;
    description: string;
    daily_rate: number;
    license_plate: string;
    fine_amount: number;
    brand: string;
    category_id: string;
}

class CarsRepositoryInMemory implements ICarsRepository {

    cars: Car[] = [];

    async store({name,description,daily_rate,license_plate,fine_amount,brand,category_id}:ICarUSeCaseData): Promise<Car> {
        const car = new Car();

        Object.assign(car, {name,description,daily_rate,license_plate,fine_amount,brand,category_id});

        this.cars.push(car);

        return car;
    };
    
    async findByLicensePlate(license_plate: string): Promise<Car> {
        return this.cars.find(car => car.license_plate === license_plate);
    }

}

export {CarsRepositoryInMemory}