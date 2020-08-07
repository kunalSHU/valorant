const express = require('express');
const express_graphql = require('express-graphql');
const cors = require('cors');

const PORT = 8081;
// GraphQL schema
const schema = require('./schema');

// const Knex = require("knex");
// const knex = Knex({
//   client: 'pg',
//   connection: { 
//     host: '142.1.46.70', 
//     user: 'postgres', 
//     password: 'postgres', 
//     database: 'patient_db', 
//     port: 8088
//     },
// });

// Root resolver
const root = {
  message: () => 'Hello this is the booking service connecting to the bookings and appointments db!',
  newAppointment: ({appointmentid, userid, questionaireId, doctorid, created_at, begins_at, ends_at, appt_type,
    status_appt}) => {
      return knex("bookings_db.appointments_info_basic_tbl").insert({
        appointmentid: appointmentid,
        userid: userid,
        questionaireId: questionaireId,
        doctorid: doctorid,
        created_at: created_at,
        begins_at: begins_at,
        ends_at: ends_at,
        appt_type: appt_type,
        status_appt: status_appt,
      })
    },
  newQuestionaire: ({questionaireid, flu, sneeze, shivers, headache, bejointPainns_at, troubleSleeping, shortnessOfBreath,
    nausea}) => {
      return knex("bookings_db.questionaire_tbl").insert({
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
  newMedication: ({medicationid, medicationName, medicationCost, manufacturer, form, pack, otherDetails}) => {
      return knex("bookings_db.medication_tbl").insert({
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
  newPrescribedMedication: ({appointmentid, medicationid, date_issued, quantity, derivedCost}) => {
      return knex("bookings_db.prescribed_medications_tbl").insert({
        appointmentid: appointmentid,
        medicationid: medicationid,
        date_issued: date_issued,
        quantity: quantity,
        derivedCost: derivedCost,
      })
  },
  newAllergy: ({allergyid, allergyName, otherFacts}) => {
    return knex("bookings_db.allergy_tbl").insert({
      allergyid: allergyid,
      allergyName: allergyName,
      otherFacts: otherFacts,
    })
  },
  newUserAllergy: ({userid, allergyid}) => {
    return knex("bookings_db.user_allergy_tbl").insert({
      userid: userid,
      allergyid: allergyid,
    })
  },
  newUserVitals: ({vitalid, userid, bloodpressure, bloodtype, height, weight, dateChecked}) => {
    return knex("bookings_db.user_vitals_tbl").insert({
      vitalid: vitalid,
      userid: userid,
      bloodpressure: bloodpressure,
      bloodtype: bloodtype,
      height: height,
      weight: weight,
      dateChecked: dateChecked,
    })
  }
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
