const router = require('express').Router();

const microserviceConfig = require('./services-config.js');
const gqlRequests = require('../../network-utils/gql-requests.js');
const httpStatusCode = require('../../network-utils/http-status-code.js');

router.post('/bookings', async (req, res) => {
  // TODO
  res.json({ data: 'This enpoint has not been integrated with the Bookings microservice yet' });
});

router.post('/inventory', async (req, res) => {
  // TODO
  res.json({ data: 'This enpoint has not been integrated with the Inventory microservice yet' });
});

router.post('/patient-record', async (req, res) => {
  // Set timeout for request to MS
  req.setTimeout(microserviceConfig.defaultRequestTimeoutMs);

  const { query: gqlQueryString, variables: gqlQueryVariables } = req.body;

  if (gqlQueryString === undefined) {
    return res.status(httpStatusCode.CLIENT_UNPROCESSABLE_ENTINTY).json({ data: 'Query was not provided' });
  }

  const response = await gqlRequests.sendGqlRequest(
    microserviceConfig.servicesEndpoints.patientRecord,
    gqlQueryString,
    gqlQueryVariables
  );

  res.json(response);
});

module.exports = router;
