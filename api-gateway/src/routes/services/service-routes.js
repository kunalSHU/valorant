const router = require('express').Router();

const microserviceConfig = require('./services-config.js');
const gqlRequests = require('../../network-utils/gql-requests.js');
const httpStatusCode = require('../../network-utils/http-status-code.js');

router.post('/bookings', async (req, res) => {
  // Set timeout for request to MS
  req.setTimeout(microserviceConfig.defaultRequestTimeoutMs);

  const { query: gqlQueryString, variables: gqlQueryVariables } = req.body;

  if (gqlQueryString === undefined) {
    return res
      .status(httpStatusCode.CLIENT_UNPROCESSABLE_ENTINTY)
      .json({ data: 'Query was not provided for Bookings service' });
  }

  const response = await gqlRequests.sendGqlRequest(
    microserviceConfig.servicesEndpoints.bookings,
    gqlQueryString,
    gqlQueryVariables
  );

  res.json(response);
});

router.post('/medical-conditions', async (req, res) => {
  // Set timeout for request to MS
  req.setTimeout(microserviceConfig.defaultRequestTimeoutMs);

  const { query: gqlQueryString, variables: gqlQueryVariables } = req.body;

  if (gqlQueryString === undefined) {
    return res
      .status(httpStatusCode.CLIENT_UNPROCESSABLE_ENTINTY)
      .json({ data: 'Query was not provided for Medical Conditions service' });
  }

  const response = await gqlRequests.sendGqlRequest(
    microserviceConfig.servicesEndpoints.medicalConditions,
    gqlQueryString,
    gqlQueryVariables
  );

  res.json(response);
});

router.post('/patient-record', async (req, res) => {
  // Set timeout for request to MS
  console.log("HERE BOI")
  req.setTimeout(microserviceConfig.defaultRequestTimeoutMs);

  const { query: gqlQueryString, variables: gqlQueryVariables } = req.body;

  if (gqlQueryString === undefined) {
    return res
      .status(httpStatusCode.CLIENT_UNPROCESSABLE_ENTINTY)
      .json({ data: 'Query was not provided Patient service' });
  }

  const response = await gqlRequests.sendGqlRequest(
    microserviceConfig.servicesEndpoints.patientRecord,
    gqlQueryString,
    gqlQueryVariables
  );
  console.log("waiting for response")
  conseole.log(response)
  res.json(response);
});

module.exports = router;
