import axios from "axios";

// Mock data
import users from "../../data/users";

export const getAccountInfoByEmail = email => {
  return new Promise(resolve => {
    setTimeout(() => {
      axios
        .get(
          `http://dh2010pc01.utm.utoronto.ca:8086/account/find?email=${email}`
        )
        .then(response => {
          const { data } = response.data;
          resolve(data["foundAccount"]);
        })
        .catch(err => {
          return {};
        });
    }, 700);
  });
};

export const getAllUsers = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        users: users
      });
    }, 700);
  });
};
