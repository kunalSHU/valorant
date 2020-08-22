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
        .then(async response => {
          const allPatientAppointments = response.data.data.appointmentByUserId;

          const uniqueDoctorIdsFromAllPatientAppointments = [
            ...new Set(
              allPatientAppointments.map(appointment => appointment.doctorid)
            )
          ];

          const doctorIdNameMap = {};

          // Find the name for each unqiue doctor from all of the patient's appointments
          for (
            let i = 0;
            i < uniqueDoctorIdsFromAllPatientAppointments.length;
            i++
          ) {
            const currentDoctorId =
              uniqueDoctorIdsFromAllPatientAppointments[i];

            try {
              const doctorNameResponse = await axios.post(
                `${API_GATEWAY_ENDPOINT}/services/patient-record`,
                {
                  query: `
                    query{
                      getUserInfoByAccountId(accountId: ${currentDoctorId}) {
                        first_name
                        last_name
                      }
                    }
                  `
                }
              );

              // Add the full name of the doctor to the map to later be added to the list of appointments
              const {
                first_name: firstName,
                last_name: lastName
              } = doctorNameResponse.data.data.getUserInfoByAccountId[0];

              doctorIdNameMap[currentDoctorId] = `${firstName} ${lastName}`;
            } catch (err) {
              continue;
            }
          }

          // Add doctor name to list of appointments
          for (let i = 0; i < allPatientAppointments.length; i++) {
            const doctorId = allPatientAppointments[i].doctorid;
            allPatientAppointments[i].doctor_full_name =
              doctorIdNameMap[doctorId];
          }

          resolve(allPatientAppointments);
        })
        .catch(err => {
          resolve(err.message);
        });
    }, PROMISE_REQUEST_DELAY_MS);
  });
};

// Books appointment for the specific account that matches the account ID, only patients can book
export const bookAppointment = (appointmentInfo) => {
  console.log('in booking appointments method')
  return axios.post(`${API_GATEWAY_ENDPOINT}/services/bookings`, {
    query: `mutation {
      newAppointment(userid: ${localStorage.getItem('accountId')} questionaireId: 8
      doctorid: 1 created_at: "${new Date().toISOString()}" begins_at: "${appointmentInfo.begins_at}"
      ends_at: "${appointmentInfo.ends_at}" appt_type: "In-Person" status_appt: "Awaiting Confirmation"){
        appointmentid
      }
    }`
  })
};
