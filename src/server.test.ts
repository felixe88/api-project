import supertest from "supertest";

import { prismaMock } from "./lib/prisma/client.mock";

import app from "./app";

const request = supertest(app);

describe("GET /planets", () => {
test("Valid request", async () => {
    const planets = [
        {
            id: 1,
            name: "Mercury",
            description: null,
            diameter: 1234,
            moons: 12,
            createdAt: "2023-04-09T08:22:11.731Z",
            updatedAT: "2023-04-09T08:21:54.038Z",
        },
        {
            id: 2,
            name: "Venus",
            description: null,
            diameter: 56784,
            moons: 2,
            createdAt: "2023-04-09T08:22:44.674Z",
            updatedAT: "2023-04-09T08:22:29.082Z",
        },
    ];

    // @ts-ignore
    prismaMock.planet.findMany.mockResolvedValue(planets);

    const response = await request
        .get("/planets")
        .expect(200)
        .expect("Content-type", /application\/json/);

    expect(response.body).toEqual(planets);
});
});

describe("POST /planets", () => {
    test("Valid request", async () => {
        const planet = {
            name: "Mercury",
            diameter: 1234,
            moons: 12,
        };

        const response = await request
            .post("/planets")
            .send(planet)
            .expect(201)
            .expect("Content-type", /application\/json/);

        expect(response.body).toEqual(planet);
    });
    test("Invalid request", async () => {
        const planet = {
            diameter: 1234,
            moons: 12,
        };

        const response = await request
            .post("/planets")
            .send(planet)
            .expect(422)
            .expect("Content-type", /application\/json/);

        expect(response.body).toEqual({
            errors: {
                body: expect.any(Array),
            },
        });
    });
});
