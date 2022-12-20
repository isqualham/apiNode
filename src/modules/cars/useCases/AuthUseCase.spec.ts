import { Errors } from "../../../errors/Errors";
import { UsersRepositoryInMemory } from "../repositories/in-memory/UsersRepositoryInMemory";
import { AuthUseCase } from "./AuthUseCase";
import { UserUseCase } from "./UserUseCase";

let authUseCase: AuthUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let userUseCase: UserUseCase;

interface IcreateUserData{
    id?: string;
    name: string;
    avatar?: string;
    password: string;
    email: string;
    driver_license: string;    
}

describe("Authenticate User ", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        authUseCase = new AuthUseCase(usersRepositoryInMemory);
        userUseCase = new UserUseCase(usersRepositoryInMemory);
    });

    it("should be able to authenticate an user", async () => {
        const user: IcreateUserData = {
            driver_license: "nskdsnd",
            email: "ifhjfkdnfdkf",
            name: "willl",
            password: "12323454355",
        };

        await userUseCase.execute(user);

        const result = await authUseCase.execute({
            email: user.email,
            password: user.password
        });

        expect(result).toHaveProperty("token");
    });

    it("should not be able to authenticate a nonexistent user", () => {
        expect(async() => {
            await authUseCase.execute({
                email: "jasopdjad",
                password: "adsadsad"
            });
        }).rejects.toBeInstanceOf(Errors);
    });

    it("should not be able to authenticate with incorrect password", () => {
        expect(async() => {            
            const user: IcreateUserData = {
                driver_license: "nskdsnd",
                email: "william@",
                name: "willl",
                password: "12323454",
            };

            await userUseCase.execute(user);

            await authUseCase.execute({
                email: "jasopdjad",
                password: "adsadsad"
            });
            
        }).rejects.toBeInstanceOf(Errors);
    });
})