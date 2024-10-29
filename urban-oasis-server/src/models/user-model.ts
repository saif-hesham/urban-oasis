import mongoose, { InferSchemaType } from "mongoose";

export const userSchema = new mongoose.Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true, minLength: 8},
  confirmPassword: {type: String, required: true, minLength: 8}
})

export type UserType = InferSchemaType<typeof userSchema>;  
export default mongoose.model("User", userSchema)