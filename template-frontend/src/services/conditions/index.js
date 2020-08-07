// Mock data
import users from "../../data/users";
import conditions from "../../data/conditions";

export const getAllUsers = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        users: users
      });
    }, 700);
  });
};

export const updateBasicInfo = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        users: users
      });
    }, 700);
  });
};

export const updateLocationInfo = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        users: users
      });
    }, 700);
  });
};

export const getAllConditionsByAccountId = accountId => {
  // Make request to backend (see conditions file in /data for expected output)
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        conditions
      });
    }, 700);
  });
};
