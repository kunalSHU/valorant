const express = require('express');
const express_graphql = require('express-graphql');
const cors = require('cors');

const PORT = 8081;
// GraphQL schema
const schema = require('./schema');

const Knex = require("knex");
const knex = Knex({
  client: 'pg',
  connection: {
    host: '142.1.46.70',
    user: 'postgres',
    password: 'postgres',
    database: 'bookings_db',
    port: 8083
  },
});

let maxAppointmentKey = 0
setPrimaryKeyAppointment = () => {
  const result = knex('bookings_info.appointments_info_basic_tbl').max('appointmentid');
  return result.then((rows) => {
    maxAppointmentKey = rows[0].max + 1;
    return rows[0].max + 1;
  });
}

// Root resolver
const root = {
  message: () => 'Hello this is the booking service connecting to the bookings and appointments db!',
  newAppointment: ({ userid, questionaireId, doctorid, created_at, begins_at, ends_at, appt_type,
    status_appt }) => {
    await setPrimaryKeyAppointment();
    return await knex("bookings_info.appointments_info_basic_tbl").insert({
      appointmentid: maxAppointmentKey,
      userid: userid,
      questionaireid: questionaireId,
      doctorid: doctorid,
      created_at: created_at,
      begins_at: begins_at,
      ends_at: ends_at,
      appt_type: appt_type,
      status_appt: status_appt,
    })
  },
  newQuestionaire: ({ questionaireid, flu, sneeze, shivers, headache, jointPain, troubleSleeping, shortnessOfBreath,
    nausea }) => {
    return knex("bookings_info.questionaire_tbl").insert({
      questionaireid: questionaireid,
      flu: flu,
      sneeze: sneeze,
      shivers: shivers,
      headache: headache,
      jointPain: jointPain,
      troubleSleeping: troubleSleeping,
      shortnessOfBreath: shortnessOfBreath,
      nausea: nausea,
    })
  },
  newMedication: ({ medicationid, medicationName, medicationCost, manufacturer, form, pack, otherDetails }) => {
    return knex("bookings_info.medication_tbl").insert({
      questionaireid: questionaireid,
      flu: flu,
      sneeze: sneeze,
      shivers: shivers,
      headache: headache,
      bejointPainns_at: bejointPainns_at,
      troubleSleeping: troubleSleeping,
      shortnessOfBreath: shortnessOfBreath,
      nausea: nausea,
    })
  },
  newPrescribedMedication: ({ appointmentid, medicationid, date_issued, quantity, derivedCost }) => {
    return knex("bookings_info.prescribed_medications_tbl").insert({
      appointmentid: appointmentid,
      medicationid: medicationid,
      date_issued: date_issued,
      quantity: quantity,
      derivedCost: derivedCost,
    })
  },
  newAllergy: ({ allergyid, allergyName, otherFacts }) => {
    return knex("bookings_info.allergy_tbl").insert({
      allergyid: allergyid,
      allergyName: allergyName,
      otherFacts: otherFacts,
    })
  },
  newUserAllergy: ({ userid, allergyid }) => {
    return knex("bookings_info.user_allergy_tbl").insert({
      userid: userid,
      allergyid: allergyid,
    })
  },
  newUserVitals: ({ vitalid, userid, bloodpressure, bloodtype, height, weight, dateChecked }) => {
    return knex("bookings_info.user_vitals_tbl").insert({
      vitalid: vitalid,
      userid: userid,
      bloodpressure: bloodpressure,
      bloodtype: bloodtype,
      height: height,
      weight: weight,
      dateChecked: dateChecked,
    })
  },
  questionare: ({ id }) => knex("bookings_info.questionaire_tbl").select("*").where({ questionaireid: id }),
  medicationById: ({ id }) => knex("bookings_info.medication_tbl").select("*").where({ medicationid: id }),
  medicationByName: ({ name }) => knex("bookings_info.medication_tbl").select("*").where({ medicationName: name }),
  vitalsByUserId: ({ userId }) => knex("bookings_info.user_vitals_tbl").select("*").where({ userid: userId }),
  latestVitalsByUserId: ({ userId }) => knex("bookings_info.user_vitals_tbl").select("*").where({ userid: userId }),
  appointmentById: ({ id }) => knex("bookings_info.appointments_info_basic_tbl").select("*").where({ appointmentid: id }),
  appointmentByUserId: ({ userId }) => knex("bookings_info.appointments_info_basic_tbl").select("*").where({ userid: userId }),
  prescribedMedicationByAppointmentId: ({ appointmentId }) => knex("bookings_info.prescribed_medications_tbl").select("*").where({ appointmentid: appointmentId }),
  userAllergiesByUserId: ({ userId }) => knex("bookings_info.user_allergy_tbl")
    .join('bookings_info.allergy_tbl', 'bookings_info.user_allergy_tbl.allergyid', '=', 'bookings_info.allergy_tbl.allergyid')
    .select('bookings_info.user_allergy_tbl.userid', 'bookings_info.user_allergy_tbl.allergyid', 'allergyname', 'otherfacts')
    .where({ userid: userId }),
};

// Create an express server and a GraphQL endpoint
const app = express();
app.use(cors());
app.use(
  '/graphql',
  express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);

const server = app
  .listen(PORT, () => {
    console.log(`Express GraphQL Server Now Running On localhost:${PORT}/graphql`);
  })
  .on('error', (error) => {
    console.log('Port in use. Existing program');
    console.error(error);
    process.exit(1);
  });

module.exports = server;
