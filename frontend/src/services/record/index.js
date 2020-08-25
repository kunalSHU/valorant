// Mock data
import axios from "axios";

import conditions from "../../data/conditions.js";

import { API_GATEWAY_ENDPOINT, PROMISE_REQUEST_DELAY_MS } from "../config.js";
import * as LocalStorageProvider from "../../utils/local-storage-provider.js";

export const getAllConditionsByAccountId = accountId => {
  // TODO retrieve from server instead of local file
  return new Promise(resolve => {
    // Make request to backend (see conditions file in /data for expected output)
    setTimeout(() => {
      resolve({
        // Change
        conditions
      });
    }, 700);
  });
};

export const postUserAddress = (street, postalCode, city, province) => {
  return axios.post(`${API_GATEWAY_ENDPOINT}/services/patient-record`, {
    query: `mutation {
      postUserAddress(streetname:"${street}" 
      city:"${city}" postal_code:"${postalCode}" province:"${province}") {
        addressid
      }
    }`
  });
};

export const postUserInfo = (
  firstName,
  lastName,
  phoneNumber,
  dateofbirth,
  sex,
  email
) => {
  if (dateofbirth instanceof Object) {
    var formatDOB = dateofbirth.format("YYYY-MM-DD");
  }
  return axios.post(`${API_GATEWAY_ENDPOINT}/services/patient-record`, {
    query: `mutation {
      postUserInfo(first_name:"${firstName}" 
      last_name:"${lastName}" phone_number:"${phoneNumber}" email:"${email}" birthdate:"${formatDOB}"
      date_became_patient:"${new Date().toISOString()}" sex:"${sex}") {
        userid
        addressid
      }
    }`
  });
};

export const updateBasicInfoByAccountId = (accountId, basicInfo) => {
  const { firstName, lastName, sex } = basicInfo;

  return new Promise(resolve => {
    // Make call to BE to update data
    setTimeout(() => {
      resolve({
        // Some resolution here
      });
    }, 700);
  });
};

export const retrieveBasicInfoByAccountId = accountId => {
  LocalStorageProvider.setItem(LocalStorageProvider.LS_KEYS.ADDRESS_ID, "");

  return new Promise(resolve => {
    setTimeout(() => {
      return axios
        .post(`${API_GATEWAY_ENDPOINT}/services/patient-record`, {
          query: `
            query {
              getUserInfoByAccountId(accountId: ${accountId}) {
                addressid
                first_name
                last_name
                sex
              }
            }
          `
        })
        .then(response => {
          const data = response.data.data.getUserInfoByAccountId[0];

          console.log(data);

          LocalStorageProvider.setItem(
            LocalStorageProvider.LS_KEYS.ADDRESS_ID,
            data.addressid
          );

          resolve({
            firstName: data.first_name,
            lastName: data.last_name,
            sex: data.sex
          });
        })
        .catch(() => {
          resolve("Could not retrieve profile information");
        });
    }, PROMISE_REQUEST_DELAY_MS);
  });
};

export const retrieveAddressInfoByAddressId = addressId => {
  console.log(`ADDRESSID: ${addressId}`);
  return new Promise(resolve => {
    setTimeout(() => {
      return axios
        .post(`${API_GATEWAY_ENDPOINT}/services/patient-record`, {
          query: `
            query {
              getAddressById(addressid: ${addressId}) {
                streetname
                city
                postal_code
                province
              }
            }`
        })
        .then(response => {
          console.log(response);
          resolve(response);
        })
        .catch(errMessage => {
          resolve(errMessage);
        });
    }, 700);
  });
};

export const updateLocationInfoByAccountId = (accountId, locationInfo) => {
  const { street, postalCode, city, province } = locationInfo;

  return new Promise(resolve => {
    // Make call to BE to update data
    setTimeout(() => {
      resolve({
        // Some resolution here
      });
    }, 700);
  });
};

export const retrieveVitalsInfoByAccountId = accountId => {
  // Expect { weight, height, bloodType } to be returned from BE

  return new Promise(resolve => {
    // Make call to BE update data
    setTimeout(() => {
      resolve({
        // Some resolution here
      });
    }, 700);
  });
};

export const updateVitalsInfoByAccountId = (accountId, vitalsInfo) => {
  // { weight, height, bloodType } = vitals;

  return new Promise(resolve => {
    // Make call to BE to update data
    setTimeout(() => {
      resolve({
        // Some resolution here
      });
    }, 700);
  });
};

export const updateAppointmentDoctorNotesByAppointmentId = (
  appointmentId,
  notes
) => {
  // notes is a string that are the notes the doctor wrote for a specific appointment

  return new Promise(resolve => {
    // Make call to BE to update data
    setTimeout(() => {
      resolve({
        // Some resolution here
      });
    }, 700);
  });
};

export const getAppointmentDoctorNotesByAppointmentId = appointmentId => {
  return new Promise(resolve => {
    // Make call to BE to update data
    setTimeout(() => {
      resolve({
        // Some resolution here (return a string which is the notes)
      });
    }, 700);
  });
};
