const fetch = require('node-fetch');

// TODO Add Unit Tests (i.e. valid query, query nonexistent service, query invalid endpoint on valid service, sending non-gql queries, etc.)

/**
 * Sends a GQL query to the specified endpoint and returns the JSON data returned from the endpoint.
 *
 * @param {string} endpointUrl - The GQL microservice endpoint to query.
 * @param {string} gqlQueryString - The GQL query/mutation to send to the microservice endpoint (i.e endpointUrl).
 * @param {object} gqlQueryVariables - A JS object containing string key/value pairs specifying different query variables to be sent to the endpoint.
 *
 * @returns {void}
 *
 * @example
 * Send a GQL request to the endpoint hosted on http://192.168.1.114:3002/api.
 *
 * const response = sendGqlRequest('http://192.168.1.114:3002/api', gqlQueryString, gqlQueryVariables);
 * response
 *   .then((data) => {
 *     // Do something with the returned data
 *   })
 *   .catch((err) => {
 *     const { message } = err
 *     // Do something with the error and its message
 *   });
 */
const sendGqlRequest = async (endpointUrl, gqlQueryString, gqlQueryVariables = {}) => {
  if (
    gqlQueryString === '' ||
    gqlQueryString === null ||
    gqlQueryString === 'undefined' ||
    gqlQueryString.trim() === ''
  ) {
    throw new TypeError('Invalid gqlQueryString provided. Must be a string');
  }

  try {
    const requestConfig = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: gqlQueryString,
        variables: gqlQueryVariables
      }),
      compress: true
    };

    const response = await fetch(endpointUrl, requestConfig);

    const { status: responseStatus } = response;

    if (responseStatus >= 200 && responseStatus <= 299) {
      const responseFromGqlEndpoint = await response.json();
      return { data: responseFromGqlEndpoint.data, status: responseStatus };
    } else {
      throw new Error(`Request to ${endpointUrl} failed. Endpoint returned status: ${responseStatus}`);
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = { sendGqlRequest };
