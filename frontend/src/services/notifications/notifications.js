import axios from "axios";

import { API_GATEWAY_ENDPOINT, PROMISE_REQUEST_DELAY_MS } from "../config.js";

export const getAllNotifications = accountId => {
  return new Promise(resolve => {
    setTimeout(() => {
      axios
        .get(`${API_GATEWAY_ENDPOINT}/notifications?accountId=${accountId}`)
        .then(response => {
          const data = response.data;
          resolve(data);
        })
        .catch(errMessage => {
          resolve(errMessage);
        });
    }, PROMISE_REQUEST_DELAY_MS);
  });
};
