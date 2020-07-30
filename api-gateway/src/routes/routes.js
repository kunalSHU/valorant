const router = require('express').Router();
const httpStatusCode = require('../network-utils/http-status-code.js');

router.get('/', (req, res) => {
  res.status(httpStatusCode.OK).json({ message: 'Valorant API Gateway reached' });
});

router.use('/account', require('./accounts/account-routes.js'));
router.use('/healthcheck', require('./healthcheck/healthcheck-routes.js'));

module.exports = router;
