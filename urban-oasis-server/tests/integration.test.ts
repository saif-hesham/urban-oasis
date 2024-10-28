import mongoose from "mongoose";
import request from "supertest";
import mockApartment from "../src/constants/mock-data";
import app from "../src/index";
import Apartment from "../src/models/apartment-model";

let apartmentId: string;

beforeAll(async () => {
  await mongoose.connect("mongodb://localhost:27017/test_db");
  await Apartment.deleteMany({});
});

afterAll(async () => {
  if (mongoose.connection.db) await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

describe("Given database is empty", () => {
  it("responds with an empty array when making get request to /apartments", async () => {
    const response = await request(app)
      .get("/apartment-management/apartments")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
    expect(response.body.data).toHaveLength(0);
  });
});

describe("Given a valid apartment object", () => {
  it("should create an apartment when making a post request to /apartments", async () => {
    const response = await request(app)
      .post("/apartment-management/apartments")
      .send(mockApartment)
      .set("Accept", "application/json");

    apartmentId = response.body._id;
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(mockApartment);
    expect(response.body).toHaveProperty("_id");
  });
});

describe("Given an invalid apartment object", () => {
  it("should return status 422 when making a post request to /apartments", async () => {
    const invalidApartment = { ...mockApartment, price: "invalid" };
    const response = await request(app)
      .post("/apartment-management/apartments")
      .send(invalidApartment)
      .set("Accept", "application/json");

    expect(response.status).toBe(422);
    expect(response.body.message).toContain(
      "Expected number, received string in price"
    );
  });

  it("should return status 422 when making a post request to /apartments", async () => {
    const invalidApartment = { ...mockApartment, price: null };
    const response = await request(app)
      .post("/apartment-management/apartments")
      .send(invalidApartment)
      .set("Accept", "application/json");

    expect(response.status).toBe(422);
    expect(response.body.message).toContain(
      "Expected number, received null in price"
    );
  });
});

describe("Given one object is inserted in the database", () => {
  it("responds with an array of size 1 when making get request to /apartments", async () => {
    const response = await request(app)
      .get("/apartment-management/apartments")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
    expect(response.body.data).toHaveLength(1);
    expect(response.body).toHaveProperty("count", 1);
    expect(response.body).toHaveProperty("currentPage", 1);
    expect(response.body).toHaveProperty("totalPages", 1);
  });
});

describe("Given a non existent/invalid search query", () => {
  it("responds with an empty array of when making get request to /apartments", async () => {
    const response = await request(app)
      .get("/apartment-management/apartments")
      .query({ unitName: "invalid" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
    expect(response.body.data).toHaveLength(0);
  });

  it("returns status 422 when making a get request to /apartments", async () => {
    const response = await request(app)
      .get("/apartment-management/apartments")
      .query({ unitNumber: "invalid" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(422);
    expect(response.body.message).toContain(
      "Expected number, received nan in unitNumber"
    );
  });
});

describe("When getting an apartment by id", () => {
  it("with an apartment object if the document exists", async () => {
    const response = await request(app)
      .get("/apartment-management/apartments/" + apartmentId)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
    expect(response.body).toMatchObject(mockApartment);
  });

  it("responds with an error message if the document does not exist", async () => {
    const response = await request(app)
      .get("/apartment-management/apartments/66e328d783e2e8b0b71f7d98")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404);
    expect(response.body.message).toContain("was not found");
  });

  it("responds with an error message if the id is invalid", async () => {
    const response = await request(app)
      .get("/apartment-management/apartments/invalid-id")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(422);
    expect(response.body.message).toContain("Invalid MongoDB ObjectId in id");
  });
});
