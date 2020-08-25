import axios from "axios";

import { API_GATEWAY_ENDPOINT, PROMISE_REQUEST_DELAY_MS } from "../config.js";

export const updateAppointmentStatus = (appointmentId, appointmentStatus) => {
  return new Promise(resolve => {
    setTimeout(() => {
      axios
        .post(`${API_GATEWAY_ENDPOINT}/services/bookings`, {
          query: `
            mutation {
              updateAppointmentStatus(
                appointmentid: ${appointmentId}
                status_appt: "${appointmentStatus}"
              ) {
                appointmentid
                status_appt
              }
            }
          `
        })
        .then(response => {
          resolve(response);
        })
        .catch(errMessage => {
          resolve(errMessage);
        });
    }, 0);
  });
};

export const getAllAppointmentsWithStatus = statusList => {
  return new Promise(resolve => {
    setTimeout(() => {
      axios
        .post(`${API_GATEWAY_ENDPOINT}/services/bookings`, {
          query: `
            query {
              allAppointments {
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
        .then(async response => {
          const allAppointments = response.data.data.allAppointments;

          const appointmentsWithGivenStatus = allAppointments.filter(
            appointment => statusList.indexOf(appointment.status_appt) >= 0
          );

          resolve(appointmentsWithGivenStatus);
        })
        .catch(errMessage => {
          resolve(errMessage);
        });
    }, PROMISE_REQUEST_DELAY_MS);
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
        .then(async response => {
          const allPatientAppointments = response.data.data.appointmentByUserId;
          resolve(allPatientAppointments);
        })
        .catch(errMessage => {
          resolve(errMessage);
        });
    }, PROMISE_REQUEST_DELAY_MS);
  });
};

// Books appointment for the specific account that matches the account ID, only patients can book
export const bookAppointment = (accountId, appointmentInfo) => {
  const {
    appt_type: appointmentType,
    begins_at: dateTimeBeginsAt,
    ends_at: dateTimeEndsAt,
    doctorid: doctorId,
    status_appt: appointmentStatus
  } = appointmentInfo;

  return new Promise(resolve => {
    setTimeout(() => {
      axios
        .post(`${API_GATEWAY_ENDPOINT}/services/bookings`, {
          query: `
            mutation {
              newAppointment(
                userid: ${accountId},
                questionaireId: 8,
                doctorid: ${doctorId},
                created_at: "${new Date().toISOString()}",
                begins_at: "${dateTimeBeginsAt}",
                ends_at: "${dateTimeEndsAt}",
                appt_type: "${appointmentType}",
                status_appt: "${appointmentStatus}"
              ) {
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
          const data = response.data.data.newAppointment;
          resolve(data);
        })
        .catch(errMessage => {
          resolve(errMessage);
        });
    }, PROMISE_REQUEST_DELAY_MS);
  });
};
