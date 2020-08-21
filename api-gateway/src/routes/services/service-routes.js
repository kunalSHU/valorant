const router = require('express').Router();

const microserviceConfig = require('./services-config.js');
const gqlRequests = require('../../network-utils/gql-requests.js');
const httpStatusCode = require('../../network-utils/http-status-code.js');
const logger = require('../../logger/logger.js');

router.post('/bookings', async (req, res) => {
  // Set timeout for request to MS
  req.setTimeout(microserviceConfig.defaultRequestTimeoutMs);

  const { query: gqlQueryString, variables: gqlQueryVariables } = req.body;

  if (gqlQueryString === undefined) {
    return res
      .status(httpStatusCode.CLIENT_UNPROCESSABLE_ENTINTY)
      .json({ data: 'Query was not provided for Bookings service' });
  }

  try {
    const response = await gqlRequests.sendGqlRequest(
      microserviceConfig.servicesEndpoints.bookings,
      gqlQueryString,
      gqlQueryVariables
    );
    res.json(response);
  } catch (err) {
    logger.error(err);
    res.status(httpStatusCode.SERVER_INTERNAL_ERROR).json({ data: err });
  }
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

  try {
    const response = await gqlRequests.sendGqlRequest(
      microserviceConfig.servicesEndpoints.medicalConditions,
      gqlQueryString,
      gqlQueryVariables
    );
    res.json(response);
  } catch (err) {
    logger.error(err);
    res.status(httpStatusCode.SERVER_INTERNAL_ERROR).json({ data: err });
  }
});

router.post('/patient-record', async (req, res) => {
  // Set timeout for request to MS
  req.setTimeout(microserviceConfig.defaultRequestTimeoutMs);

  const { query: gqlQueryString, variables: gqlQueryVariables } = req.body;

  if (gqlQueryString === undefined) {
    return res
      .status(httpStatusCode.CLIENT_UNPROCESSABLE_ENTINTY)
      .json({ data: 'Query was not provided Patient service' });
  }

  try {
    const response = await gqlRequests.sendGqlRequest(
      microserviceConfig.servicesEndpoints.patientRecord,
      gqlQueryString,
      gqlQueryVariables
    );
    res.json(response);
  } catch (err) {
    logger.error(err);
    res.status(httpStatusCode.SERVER_INTERNAL_ERROR).json({ data: err });
  }
});

module.exports = router;
