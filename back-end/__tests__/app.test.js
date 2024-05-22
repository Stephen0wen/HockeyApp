const app = require("../app");
const request = require("supertest");
const endpoints = require("../../endpoints.json");

describe("/api", () => {
    test("GET:200 Should return endpoints.json to the client", () => {
        return request(app)
            .get("/api")
            .expect(200)
            .then(({ body }) => {
                expect(body).toEqual(endpoints);
            });
    });
});
