import axios from "axios";

import { API_GATEWAY_ENDPOINT, PROMISE_REQUEST_DELAY_MS } from "../config.js";
import * as LocalStorageProvider from "../../utils/local-storage-provider.js";

// TODO rename folder from user to account

// TODO
export const getAccountInfoByEmail = email => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(email);
    }, 700);
  });
};

export const authenticateUser = (emailAddress, password) => {
  LocalStorageProvider.setItem(
    LocalStorageProvider.LS_KEYS.IS_AUTHENTICATED,
    false
  );
  LocalStorageProvider.setItem(LocalStorageProvider.LS_KEYS.ACCOUNT_EMAIL, "");
  LocalStorageProvider.setItem(LocalStorageProvider.LS_KEYS.ACCOUNT_ID, "");
  LocalStorageProvider.setItem(LocalStorageProvider.LS_KEYS.ACCOUNT_ROLE, "");
  LocalStorageProvider.setItem(
    LocalStorageProvider.LS_KEYS.ACCOUNT_AUTH_TOKEN,
    ""
  );

  return new Promise(resolve => {
    setTimeout(() => {
      axios
        .post(`${API_GATEWAY_ENDPOINT}/account/auth`, {
          emailAddress,
          password
        })
        .then(response => {
          const data = response.data.data;

          console.log(data);

          LocalStorageProvider.setItem(
            LocalStorageProvider.LS_KEYS.IS_AUTHENTICATED,
            true
          );
          LocalStorageProvider.setItem(
            LocalStorageProvider.LS_KEYS.ACCOUNT_EMAIL,
            emailAddress
          );
          LocalStorageProvider.setItem(
            LocalStorageProvider.LS_KEYS.ACCOUNT_ID,
            data.account_id
          );
          LocalStorageProvider.setItem(
            LocalStorageProvider.LS_KEYS.ACCOUNT_ROLE,
            data.account_role
          );
          LocalStorageProvider.setItem(
            LocalStorageProvider.LS_KEYS.ACCOUNT_AUTH_TOKEN,
            data.jwt_token
          );

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
