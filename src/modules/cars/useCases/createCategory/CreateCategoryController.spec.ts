import { response } from "express";
import request from "supertest";
import { Connection } from "typeorm";
import { app } from "../../../../app";
import createConnection from '../../../../dataBase/index';
import {hash} from "bcryptjs";
import {v4 as uuidV4 } from "uuid";

let connection: Connection;

describe("Create Category Controller",() =>{

    beforeEach(async() => {

        const connection = await createConnection("localhost");

        const password = await hash("admin",8);
        const id = uuidV4();

        await connection.query(
            `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
            VALUES('${id}', 'William de Freitas', 'williamfacme@gmail.com', '${password}', true, 'now()', 'xxxxx')
            `
    )

    });

    it("should be able to create a new category", async() =>{
        const responseToken = await request(app).post("/auth")
        .send({
            email:"williamfacme@gmail.com",
            password:"admin"
        });

        const {token} = responseToken.body;

        await request(app).post("/categories").send({
            name: "category super test",
            description: "Super test"
        }).set({
            Authorization: `Bear ${token}`
        });

        expect(response.status).toBe(201);
    });  
    
    it("should not be able to create a new category with name exists", async() =>{
        const responseToken = await request(app).post("/auth")
        .send({
            email:"williamfacme@gmail.com",
            password:"admin"
        });

        const {token} = responseToken.body;

        await request(app).post("/categories").send({
            name: "category super test",
            description: "Super test"
        }).set({
            Authorization: `Bear ${token}`
        });

        expect(response.status).toBe(400);
    });  
});