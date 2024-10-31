import mongoose, { InferSchemaType } from 'mongoose';
import bcrypt from 'bcrypt';
import Constants from '../constants/constants';

export const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minLength: 8, select: false },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, Constants.SALT_ROUNDS);
  }
  next();
});

export type UserType = InferSchemaType<typeof userSchema>;
export type UserDTO = Omit<UserType, 'createdAt' | 'updatedAt'>;
export default mongoose.model('User', userSchema);
