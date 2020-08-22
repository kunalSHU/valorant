// Mock data
import users from "../../data/users";
import conditions from "../../data/conditions";
import axios from "axios";

const API_GATEWAY_ENDPOINT = "http://142.1.46.70:8082";
const PROMISE_REQUEST_DELAY_MS = 1500;

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

export const getAllUsers = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        users: users
      });
    }, 700);
  });
};

export const postUserAddress = (street, postalCode, city, province) => {
  console.log(street);
  console.log(postalCode);
  console.log(city);
  console.log(province);
  return axios.post(`${API_GATEWAY_ENDPOINT}/services/patient-record`, {
    query: `mutation {
      postUserAddress(streetname:"${street}" 
      city:"${city}" postal_code:"${postalCode}" province:"${province}") {
        addressid
      }
    }`
    // }).then((response) => {
    //   console.log(response.status)
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
  console.log(firstName);
  console.log(lastName);
  console.log(phoneNumber);
  console.log(dateofbirth);
  console.log(sex);
  console.log(email);
  // mutation{
  //   postUserInfo(first_name: "Kunal" last_name: "shukla"
  //   phone_number: "233-232-3232" email: "hello@mail.com"
  //   birthdate: "05-11-2018" date_became_patient: "08-08-2020"
  //   sex: "Male") {
  //     userid
  //     addressid
  //   }

  //check to see if its a moment obj, then convert to yyyy-mm-dd format
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

export const retrieveLocationInfoByAccountId = accountId => {
  // Expect { firstName, lastName, sex } to be returned from BE
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
  localStorage.setItem("addressId", "");

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

          localStorage.setItem("addressId", data.addressId);

          resolve({
            firstName: data.first_name,
            lastName: data.last_name,
            sex: data.sex
          });
        })
        .catch(() => {
          resolve({ errMessage: "Could not retrieve appointments" });
        });
    }, PROMISE_REQUEST_DELAY_MS);
  });
};

export const retrieveAddressInfoByAddressId = addressId => {
  return axios.post(`${API_GATEWAY_ENDPOINT}/services/patient-record`, {
    query: `
      query {
        getAddressById(addressid: ${addressId}) {
          streetname
          city
          postal_code
          province
        }
      }`
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
