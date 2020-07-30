const router = require('express').Router();

const healthcheckController = require('../../controllers/healthcheck-controller.js');
const httpStatusCode = require('../../network-utils/http-status-code.js');

router.get('/', (req, res) => {
  res.status(httpStatusCode.OK).json({
    serviceName: 'API Gateway',
    message: `Pinging /healthcheck on API Gateway`,
    data: healthcheckController.getHealthcheckInfo(req)
  });
});

module.exports = router;
