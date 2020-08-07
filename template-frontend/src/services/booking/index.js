// Mock data
import users from "../../data/users";
import conditions from "../../data/conditions";

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
    // Make call to BE to update data
    setTimeout(() => {
      resolve({
        // Some resolution here (return a string which is the notes)
      });
    }, 700);
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
