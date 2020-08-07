// Mock data
import users from "../../data/users";

export const getAllUsers = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        users: users
      });
    }, 700);
  });
};
