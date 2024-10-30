import Apartment, { ApartmentType } from "../src/models/apartment-model";
import Constants from "../src/constants/constants";
import mongoose from "mongoose";
import env from "../src/config/config";
import axios from "axios";
const { faker } = require("@faker-js/faker");

// Apartment factory
const createApartment = (id: number, imgURL: string): ApartmentType => {
  const price = faker.helpers.arrayElement(Constants.LISTING_PRICES);
  const amenitiesCount = faker.number.int({ min: 0, max: 3 });
  const amenities =
    amenitiesCount === 0
      ? null
      : faker.helpers.arrayElements(Constants.AMENITIES, amenitiesCount);
  return {
    unitNumber: id,
    image: imgURL,
    unitName: faker.helpers.arrayElement(Constants.PROPERTY_TITLES),
    description: faker.lorem.sentences(10),
    price,
    amenities,
    listingType: price < 1000000 ? "Rental" : "Sale",
    bedrooms: faker.number.int({ min: 1, max: 5 }),
    bathrooms: faker.number.int({ min: 1, max: 3 }),
    sizeInMeterSquared: faker.number.int({ min: 50, max: 500 }),
    project: faker.helpers.arrayElement(Constants.PROJECT_NAMES),
    address: {
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zipCode: faker.location.zipCode(),
    },
  };
};

const fetchImageUrls = async (): Promise<string[]> => {
  console.log("Fetching image URLs from Unsplash...");
  const response = await axios.get("https://api.unsplash.com/photos/random", {
    params: {
      query: "apartment, villa, real estate",
      client_id: env.UNSPLASH_API_KEY,
      count: Constants.APARTMENT_COUNT,
    },
  });
  const data: { urls: { regular: string } }[] = response.data;
  console.log("Fetched image URLs successfully.");
  return data.map(image => image.urls.regular);
};

async function seedDatabase() {
  try {
    await mongoose.connect(env.DATABASE_URL);
    console.log("Connected to database");

    const imageUrls = await fetchImageUrls();

    await Apartment.deleteMany({});
    console.log("Cleared existing apartments");

    // Seed apartments
    const apartments = Array(Constants.APARTMENT_COUNT)
      .fill(null)
      .map((_, i) => createApartment(i + 1, imageUrls[i]));
    await Apartment.insertMany(apartments);

    console.log(
      "Database seeded successfully with apartments and predefined images"
    );
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from database");
  }
}

seedDatabase();
