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

interface ICarsRepository{
    store({name,description,daily_rate,license_plate,fine_amount,brand,category_id}:ICarUSeCaseData): Promise<Car>;
    findByLicensePlate(license_plate: string): Promise<Car>;
    
}

export {ICarsRepository}