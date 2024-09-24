import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Apartment Management API",
      version: "1.0.0",
      description: "API for managing apartments",
    },
    servers: [
      {
        url: "http://localhost:4000/apartment-management/", // Update with your server URL
        description: "Development server",
      },
    ],
  },
  apis: ["./routes/*.js", "./models/*.js"], // Path to the API docs
};

const specs = swaggerJsdoc(options);

export default specs;
