import { Errors } from "../../../../errors/Errors";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { CarUseCase } from "./CarUseCase";

let carUseCase: CarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;


describe("Create Car", () =>{

    beforeEach(() => {

        carsRepositoryInMemory = new CarsRepositoryInMemory();
        carUseCase = new CarUseCase(carsRepositoryInMemory);
    })

    it("should be able to create a new car", async () => {
        const car = await carUseCase.execute({
            name: "william",
            description: "agora",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 100,
            brand: "dsdsd",
            category_id: "eoriyugjdlflgh"
        });

        expect(car).toHaveProperty("id");
        
    })

    it("should not be able to create a car with exists licence plate", async () => {

        expect(async () => {
            await carUseCase.execute({
                name: "william",
                description: "agora",
                daily_rate: 100,
                license_plate: "ABC-1234",
                fine_amount: 100,
                brand: "dsdsd",
                category_id: "eoriyugjdlflgh"
            });
        });

        expect(async () => {
            await carUseCase.execute({
                name: "william2",
                description: "agora",
                daily_rate: 100,
                license_plate: "ABC-1234",
                fine_amount: 100,
                brand: "dsdsd",
                category_id: "eoriyugjdlflgh"
            });
        }).rejects.toBeInstanceOf(Errors);

    });

    it("should be able to create a car with available true defaults", async () => {

        const car = await carUseCase.execute({
            name: "william2",
            description: "agora",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 100,
            brand: "dsdsd",
            category_id: "eoriyugjdlflgh"
        });

        expect(car.available).toBe(true);
    });
});