const router = require('express').Router();
const httpStatusCode = require('../network-utils/http-status-code.js');

router.get('/', (req, res) => {
  res.status(httpStatusCode.OK).json({ message: 'Valorant API Gateway reached' });
});

// API Gateway routes
router.use('/account', require('./accounts/account-routes.js'));
router.use('/healthcheck', require('./healthcheck/healthcheck-routes.js'));

// Microservice routes that are proxied by the gateway
router.use('/services', require('./services/service-routes.js'));

module.exports = router;
