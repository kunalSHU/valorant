// Mock data
import users from "../../data/users";
import conditions from "../../data/conditions";

export const getAllUsers = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        users: users
      });
    }, 700);
  });
};

export const retrieveBasicInfoByAccountId = accountId => {
  // Expect { firstName, lastName, sex } to be returned from BE

  return new Promise(resolve => {
    // Make call to BE update data
    setTimeout(() => {
      resolve({
        // Some resolution here
      });
    }, 700);
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

export const retrieveLocationInfoByAccountId = accountId => {
  // Expect { street, postalCode, city, province } to be returned from BE

  return new Promise(resolve => {
    // Make call to BE update data
    setTimeout(() => {
      resolve({
        // Some resolution here
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
