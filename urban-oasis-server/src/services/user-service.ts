import User, { UserDTO } from "../models/user-model";
export const signUpUser = async (user: UserDTO) => {
  console.log('user', user);
  const newUser = await User.create(user);
  return {userId: newUser._id};
}