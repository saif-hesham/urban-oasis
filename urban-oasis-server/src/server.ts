import mongoose from "mongoose";
import env from "./config/config";
import app from "./index";
const port = env.PORT;
app.listen(port, () => {
  console.log(`Server running on http://localhost/${port}`);
  console.log(`Swagger UI: http://localhost:${port}/api-docs`);
});

mongoose
  .connect(env.DATABASE_URL)
  .then(() => console.log("DB connection was successful"));