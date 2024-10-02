import UserModel from "../components/Users/user.model.js";

export const adminPermission = async (userId) => {
  const user = await UserModel.findById(userId);
  if (user.role != "ADMIN") {
    return false;
  }
  return true;
};
