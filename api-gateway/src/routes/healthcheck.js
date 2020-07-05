const router = require('express').Router();

const healthcheckController = require('../controllers/healthcheck-controller.js');

const httpStatusCode = require('../utils/http-status-code.js');
const environmentConfig = require('../../environment-config.json');

router.get('/', (req, res) => {
  res.status(httpStatusCode.OK).json({
    serviceName: environmentConfig.application.serviceName,
    message: `Pinging /healthcheck on ${environmentConfig.application.serviceName}`,
    data: healthcheckController.getHealthcheckInfo(req)
  });
});

module.exports = router;
