const express = require('express');
const express_graphql = require('express-graphql');
const cors = require('cors');
const schema = require('./schema');
const Knex = require('knex');

const PORT = process.env.APP_PORT || 8087;

const knex = Knex({
  client: 'pg',
  connection: {
    host: '142.1.46.70',
    user: 'postgres',
    password: 'postgres',
    database: 'patient_db',
    port: 8088
  }
});

let maxValUserAddress = 0;
let maxValUserAddressStep2 = 0;
const setPrimaryKeyUserAddress = () => {
  const result = knex('patient_info.address_info_tbl').max('addressid');
  return result.then((rows) => {
    maxValUserAddress = rows[0].max + 1;
    return rows[0].max + 1;
  });
};

let maxValUserInfo = 0;
const setPrimaryKeyUserInfo = () => {
  const result = knex('patient_info.patient_basic_info_tbl').max('userid');
  return result.then((rows) => {
    maxValUserInfo = rows[0].max + 1;
    return rows[0].max + 1;
  });
};

const root = {
  message: () => 'Hello this is patient recording!',
  userAddress: () => knex('patient_info.address_info_tbl').select('*'),
  getUserInfo: () => knex('patient_info.patient_basic_info_tbl').select('*'),
  getUserInfoByEmail: ({ email }) => knex('patient_info.patient_basic_info_tbl').select('*').where({ email: email }),
  getUserInfoByAccountId: ({ accountId }) =>
    knex('patient_info.patient_basic_info_tbl').select('*').where({ userid: accountId }),
  getAddressById: ({ addressid }) => knex('patient_info.address_info_tbl').select('*').where({ addressid: addressid }),
  postUserAddress: async ({ streetname, city, postal_code, province }) => {
    await setPrimaryKeyUserAddress();
    return await knex('patient_info.address_info_tbl').insert({
      addressid: maxValUserAddress,
      streetname: streetname,
      city: city,
      postal_code: postal_code,
      province: province
    });
  },
  postUserInfo: async ({ first_name, last_name, phone_number, email, birthdate, date_became_patient, sex }) => {
    await knex('patient_info.address_info_tbl')
      .max('addressid')
      .then((rows) => {
        console.log('first Chain');
        console.log(maxValUserAddress);
        maxValUserAddressStep2 = rows[0].max;
        console.log('maxValUserAddressStep2');
        console.log(maxValUserAddressStep2);
      })
      .then(async (response) => {
        await setPrimaryKeyUserInfo();
        console.log('second chain');
        console.log(maxValUserAddress);
      })
      .then((response) => {
        console.log('third chain');
        console.log(maxValUserAddress);
        return knex('patient_info.patient_basic_info_tbl').insert({
          userid: maxValUserInfo,
          addressid: maxValUserAddress,
          first_name: first_name,
          last_name: last_name,
          phone_number: phone_number,
          email: email,
          birthdate: birthdate,
          date_became_patient: date_became_patient,
          sex: sex
        });
      })
      .then((response) => {});
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
