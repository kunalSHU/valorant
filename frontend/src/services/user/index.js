import axios from "axios";

// Mock data
import users from "../../data/users";

// TODO rename folder from user to account

const API_GATEWAY_ENDPOINT = "http://142.1.46.70:8082";
const PROMISE_REQUEST_DELAY_MS = 1500;

// TODO
export const getAccountInfoByEmail = email => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(email);
    }, 700);
  });
};

// TODO
export const getAllUsers = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        users: users
      });
    }, 700);
  });
};

export const authenticateUser = (emailAddress, password) => {
  localStorage.setItem("isAuthenticated", false);
  localStorage.setItem("email", "");
  localStorage.setItem("accountId", "");
  localStorage.setItem("accountRole", "");

  return new Promise(resolve => {
    setTimeout(() => {
      axios
        .post(`${API_GATEWAY_ENDPOINT}/account/auth`, {
          emailAddress,
          password
        })
        .then(response => {
          const data = response.data.data;
          localStorage.setItem("isAuthenticated", true);
          localStorage.setItem("accountEmail", emailAddress);
          localStorage.setItem("authToken", data.jwt_token);
          localStorage.setItem("accountRole", data.account_role);
          localStorage.setItem("accountId", data.account_id);

          resolve({ isAuthenticated: true });
        })
        .catch(() => {
          resolve({
            isAuthenticated: false,
            errMessage: "Incorrect login credentials"
          });
        });
    }, PROMISE_REQUEST_DELAY_MS);
  });
};
