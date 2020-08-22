import axios from "axios";

// Mock data
import users from "../../data/users";
import conditions from "../../data/conditions";

const API_GATEWAY_ENDPOINT = "http://142.1.46.70:8082";
const PROMISE_REQUEST_DELAY_MS = 1500;

export const updateAppointmentStatusByAppointmentId = (
  appointmentId,
  status
) => {
  // status is a string of the status

  return new Promise(resolve => {
    // Make call to BE to update data
    setTimeout(() => {
      resolve({
        // Some resolution here
      });
    }, 700);
  });
};

export const getAllAppointmentDetailsByAppointmentId = appointmentId => {
  // Expect the following object returned { appointmentId, doctorName, appointmentDate, time, location, status }
  return new Promise(resolve => {
    // Make call to BE to update data
    setTimeout(() => {
      resolve({
        // Some resolution here (return a string which is the notes)
      });
    }, 700);
  });
};

export const getAllAppointmentsByAccountId = accountId => {
  return new Promise(resolve => {
    setTimeout(() => {
      axios
        .post(`${API_GATEWAY_ENDPOINT}/services/bookings`, {
          query: `
            query {
              appointmentByUserId(userId: ${accountId}) {
                appointmentid
                doctorid
                begins_at
                ends_at
                appt_type
                status_appt
              }
            }
          `
        })
        .then(response => {
          resolve(response.data.data.appointmentByUserId);
        })
        .catch(err => {
          resolve(err.message);
        });
    }, PROMISE_REQUEST_DELAY_MS);
  });
};

// Books appointment for the specific account that matches the account ID, only patients can book
export const bookAppointmentByAccountId = (accountId, bookingInfo) => {
  // { appointmentDate, appointmentNotes } = bookingInfo
  return new Promise(resolve => {
    // Make call to BE to update data
    setTimeout(() => {
      resolve({
        // Some resolution here (return a string which is the notes)
      });
    }, 700);
  });
};
